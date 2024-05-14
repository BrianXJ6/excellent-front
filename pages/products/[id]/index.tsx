import Head from 'next/head';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form'
import axios from 'axios';

export default function ProductsEdit() {
    const router = useRouter();
    const productId = router.query.id;
    const [product, setProduct] = useState(null);

    const showProduct = async () => {
        if (!productId) return;
        try {
            const res = await axios.get(`http://localhost/api/products/${productId}`);
            setProduct(res.data.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('_method', 'PUT');

        for (let prop in data) {
            if (data[prop] === '' || data[prop] === null || data[prop] === undefined || data[prop] == product[prop]) {
                delete data[prop];
            } else {
                if (prop != 'images')
                    formData.append(prop, data[prop]);
            }
        }

        if (data.images.length) {
            Array.from(data.images).forEach(item => formData.append('images[]', item));
        }

        try {
            const res = await axios.post(`http://localhost/api/products/${productId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                method: 'put',
            });
            alert('Produto atualizado com sucesso!');
            setProduct(res.data.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => { showProduct() }, [productId]);

    return (
        <>
            <Head>
                <title>Excellent APP - {product ? `Produto: ${product.title}` : 'OPS! Produto não encontrado!'}</title>
            </Head>
            {
                product &&
                <div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>Título</Form.Label>
                            <Col sm={10}>
                                <Form.Control required type="text" defaultValue={product.title} {...register('title')} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>Descrição</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" defaultValue={product.description} {...register('description')} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>Preço</Form.Label>
                            <Col sm={10}>
                                <Form.Control required type="number" step="0.01" defaultValue={product.price} {...register('price')} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>Estoque</Form.Label>
                            <Col sm={10}>
                                <Form.Control required type="number" defaultValue={product.stock}  {...register('stock')} />
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
                    <hr />
                    {
                        product.images.length > 0 &&
                        <div>
                            <p className='lead'>Images</p>
                            <Row>
                                {
                                    product.images.map((image, i) => (
                                        <Col key={i} xs="4">
                                            <Card>
                                                <Card.Img variant="top" src={image.path} />
                                            </Card>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>
                    }
                </div>
            }
        </>
    );
}
