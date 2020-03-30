import { createConnection, Connection } from 'typeorm';

class DBConnection {
    public async connection() {
        try {
            const db: Connection = await createConnection();
            console.log('connect mysql DB');
            return db;
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default new DBConnection();