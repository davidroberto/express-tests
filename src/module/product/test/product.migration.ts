import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../Product';

// Entité V2 simulant l'évolution du schéma : ajout de la colonne "category"
@Entity()
class ProductV2 {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true, type: 'float' })
    public price: number;

    @Column({ type: 'varchar', length: 255 })
    public title: string;

    @Column({ type: 'text', nullable: true })
    public description: string;

    @Column({ type: 'varchar', length: 255, nullable: true, default: 'uncategorized' })
    public category: string;
}

describe('Migration de données - Ajout colonne category sur Product', () => {
    let container: StartedPostgreSqlContainer;
    let migratedDataSource: DataSource;

    beforeAll(async () => {
        container = await new PostgreSqlContainer('postgres:16').withExposedPorts(5432).start();

        const connectionOptions = {
            type: 'postgres' as const,
            host: container.getHost(),
            port: container.getPort(),
            username: container.getUsername(),
            password: container.getPassword(),
            database: container.getDatabase(),
            logging: false,
            entitySkipConstructor: true
        };

        // Étape 1 : créer le schéma initial avec l'entité Product actuelle
        const initialDataSource = new DataSource({
            ...connectionOptions,
            entities: [Product],
            synchronize: true
        });
        await initialDataSource.initialize();

        // Étape 2 : insérer des données avec l'ancien schéma
        await initialDataSource.query(
            `INSERT INTO product (title, description, price) VALUES ($1, $2, $3)`,
            ['switch 2', 'nouvelle console', 500]
        );
        await initialDataSource.query(
            `INSERT INTO product (title, description, price) VALUES ($1, $2, $3)`,
            ['playstation 6', 'console next gen', 700]
        );

        // Étape 3 : fermer la connexion initiale
        await initialDataSource.destroy();

        // Étape 4 : ouvrir une nouvelle connexion avec l'entité V2 (migration)
        migratedDataSource = new DataSource({
            ...connectionOptions,
            entities: [ProductV2],
            synchronize: true
        });
        await migratedDataSource.initialize();
    });

    afterAll(async () => {
        if (migratedDataSource?.isInitialized) {
            await migratedDataSource.destroy();
        }
        if (container) {
            await container.stop();
        }
    });

    test('les données existantes survivent à la migration', async () => {
        const products = await migratedDataSource.getRepository(ProductV2).find();

        expect(products).toHaveLength(2);
        expect(products.find(p => p.title === 'switch 2')?.price).toBe(500);
        expect(products.find(p => p.title === 'playstation 6')?.price).toBe(700);
    });

    test('la nouvelle colonne a la valeur par défaut pour les anciens produits', async () => {
        const products = await migratedDataSource.getRepository(ProductV2).find();

        for (const product of products) {
            expect(product.category).toBe('uncategorized');
        }
    });

    test('un nouveau produit peut être créé avec une category', async () => {
        const repo = migratedDataSource.getRepository(ProductV2);

        const newProduct = repo.create({
            title: 'xbox series x',
            description: 'console microsoft',
            price: 600,
            category: 'gaming'
        });
        await repo.save(newProduct);

        const saved = await repo.findOneBy({ title: 'xbox series x' });
        expect(saved).not.toBeNull();
        expect(saved!.category).toBe('gaming');
        expect(saved!.price).toBe(600);
    });
});
