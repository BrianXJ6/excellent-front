import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Head from 'next/head';
import { useState } from 'react';

export default function OrdersNew() {
    const router = useRouter();
    const [inputs, setInputs] = useState([{ id: '', quantity: '' }]);
    const { register, handleSubmit } = useForm();

    const filterIndexes = () => {
        return inputs.map((item, i) => {
            if (item) return i
        }).filter(item => item >= 0);
    }

    const onSubmit = async (data) => {
        const indexes = filterIndexes();
        const products = indexes.map(index => data.products[index]);

        try {
            await axios.post(`http://localhost/api/orders`, { products });
            alert('Pedido criado com sucesso!');
            router.push('/orders');
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const addInput = () => { setInputs([...inputs, { id: '', quantity: '' }]) };

    const removeInput = (i) => {
        let inputsCopy = [...inputs];
        delete inputsCopy[i];
        setInputs(inputsCopy);
    };

    return (
        <>
            <Head>
                <title>Excellent APP - Novo pedido</title>
            </Head>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {
                    inputs.map((input, i) => !input ? (
                        <div key={i}></div>
                    ) : (
                        <div key={i}>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>ID do produto</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required type="number" {...register(`products[${i}][id]`, { required: true })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>Quantidade</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required type="number" {...register(`products[${i}][quantity]`, { required: true })} />
                                </Col>
                            </Form.Group>
                            {
                                filterIndexes().length > 1 &&
                                <Button onClick={() => removeInput(i)} variant='danger' size='sm'>remover</Button>
                            }
                            <hr />
                        </div>
                    ))
                }
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button onClick={addInput}>+</Button>
                        <Button className='ms-3' type="submit">Enviar</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
};
