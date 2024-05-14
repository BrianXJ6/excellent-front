import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Head from 'next/head';

export default function ProductsNew() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('price', data.price);
            formData.append('stock', data.stock);

            if (data.description)
                formData.append('description', data.description);

            if (data.images) {
                Array.from(data.images).forEach(item => {
                    formData.append('images[]', item);
                });
            }

            await axios.post(`http://localhost/api/products`, formData);
            alert('Produto criado com sucesso!');
            router.push('/products');
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <>
            <Head>
                <title>Excellent APP - Novo produto</title>
            </Head>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Título</Form.Label>
                    <Col sm={10}>
                        <Form.Control required type="text" {...register('title', { required: true })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Descrição</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" {...register('description')} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Preço</Form.Label>
                    <Col sm={10}>
                        <Form.Control required type="number" step="0.01" {...register('price', { required: true })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Estoque</Form.Label>
                    <Col sm={10}>
                        <Form.Control required type="number"  {...register('stock', { required: true })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Imagens</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="file" multiple {...register('images')} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Enviar</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
};
