const pool = require('../config/db');

const vendas = {
    listarTodos: async () => {
        const query = `
            SELECT v.id_vendas, v.data_venda, v.valor_total, v.itens, p.nome_razao_social AS cliente
            FROM vendas v
            LEFT JOIN pessoas p ON v.pessoa_id = p.id
            ORDER BY v.id_vendas DESC
        `;
        const [rows] = await pool.execute(query);
        return rows;
    },

    criar: async (dados) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            if (dados.itens && Array.isArray(dados.itens)) {
                for (const item of dados.itens) {
                    const queryEstoque = 'UPDATE produtos SET estoque = estoque - ? WHERE id = ?';
                    await connection.execute(queryEstoque, [item.quantidade, item.produto_id]);
                }
            }

            const queryVenda = 'INSERT INTO vendas (pessoa_id, valor_total, itens) VALUES (?, ?, ?)';
            const [result] = await connection.execute(queryVenda, [
                dados.pessoa_id || null, 
                dados.valor_total,
                typeof dados.itens === 'string' ? dados.itens : JSON.stringify(dados.itens)
            ]);

            await connection.commit();
            return result.insertId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    atualizar: async (id, dados) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const [vendaAntiga] = await connection.execute('SELECT itens FROM vendas WHERE id_vendas = ?', [id]);
            if (vendaAntiga.length === 0) {
                await connection.rollback();
                return 0;
            }

            const itensAntigos = typeof vendaAntiga[0].itens === 'string' 
                ? JSON.parse(vendaAntiga[0].itens) 
                : vendaAntiga[0].itens;

            if (itensAntigos && Array.isArray(itensAntigos)) {
                for (const item of itensAntigos) {
                    await connection.execute('UPDATE produtos SET estoque = estoque + ? WHERE id = ?', [item.quantidade, item.produto_id]);
                }
            }

            if (dados.itens && Array.isArray(dados.itens)) {
                for (const item of dados.itens) {
                    await connection.execute('UPDATE produtos SET estoque = estoque - ? WHERE id = ?', [item.quantidade, item.produto_id]);
                }
            }

            const queryUpdate = `
                UPDATE vendas 
                SET pessoa_id = ?, valor_total = ?, itens = ? 
                WHERE id_vendas = ?
            `;
            const [result] = await connection.execute(queryUpdate, [
                dados.pessoa_id || null,
                dados.valor_total,
                typeof dados.itens === 'string' ? dados.itens : JSON.stringify(dados.itens),
                id
            ]);

            await connection.commit();
            return result.affectedRows;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    deletar: async (id) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const [venda] = await connection.execute('SELECT itens FROM vendas WHERE id_vendas = ?', [id]);
            if (venda.length > 0) {
                const itens = typeof venda[0].itens === 'string' ? JSON.parse(venda[0].itens) : venda[0].itens;
                if (itens && Array.isArray(itens)) {
                    for (const item of itens) {
                        await connection.execute('UPDATE produtos SET estoque = estoque + ? WHERE id = ?', [item.quantidade, item.produto_id]);
                    }
                }
            }

            const [result] = await connection.execute('DELETE FROM vendas WHERE id_vendas = ?', [id]);
            await connection.commit();
            return result.affectedRows;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
};

module.exports = vendas;