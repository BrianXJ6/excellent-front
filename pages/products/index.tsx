import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Router from "next/router";

export default function Products() {
    const [data, setData] = useState(null);

    const productListAll = async () => {
        try {
            const res = await axios.get('http://localhost/api/products');
            setData(res.data.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const removeProduct = async (productId: number) => {
        try {
            await axios.delete(`http://localhost/api/products/${productId}`);
            productListAll();
            alert('Produto removido!');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => { productListAll() }, []);

    return (
        <>
            <Head>
                <title>Excellent APP - Produtos</title>
            </Head>
            <Table responsive size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Valor de Venda</th>
                        <th>Estoque</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.stock ?? 0}</td>
                                <td>
                                    <Button onClick={() => Router.push(`/products/${product.id}`)} variant="primary" size="sm">Editar</Button>
                                </td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => removeProduct(product.id)}>Excluir</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Button onClick={() => Router.push('/products/add')} variant="primary">Novo produto</Button>
        </>
    );
}
