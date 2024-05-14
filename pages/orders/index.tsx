import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";

export default function Orders() {
    const [data, setData] = useState(null);

    const orderListAll = async () => {
        try {
            const res = await axios.get('http://localhost/api/orders');
            setData(res.data.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const removeOrder = async (orderId: number) => {
        try {
            await axios.delete(`http://localhost/api/orders/${orderId}`);
            orderListAll();
            alert('Pedido excluído!');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => { orderListAll() }, []);

    return (
        <>
            <Head>
                <title>Excellent APP - Pedidos</title>
            </Head>
            <Table responsive size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Criado</th>
                        <th>Produtos</th>
                        <th width="1"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.created_at}</td>
                                <td>{order.products.length}</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => removeOrder(order.id)}>Excluir</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Button as={Link} href={`/orders/add`} variant="primary">Novo pedido</Button>
        </>
    );
}
