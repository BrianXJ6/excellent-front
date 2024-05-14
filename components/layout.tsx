import Link from "next/link";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="d-flex flex-column h-100">
                <header>
                    <Navbar expand="lg" fixed="top" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand>Excellent APP</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto">
                                    <Nav.Link as={Link} href="/">Início</Nav.Link>
                                    <NavDropdown title="Produtos" id="basic-nav-dropdown" align={{ lg: 'end' }}>
                                        <NavDropdown.Item as={Link} href="/products">Listagem</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} href="/products/add">Novo</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Pedidos" id="basic-nav-dropdown" align={{ lg: 'end' }}>
                                        <NavDropdown.Item as={Link} href="/orders">Listagem</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} href="/orders/add">Novo</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar >
                </header>
                <main className="flex-shrink-0 my-5 pt-4">
                    <Container>
                        {children}
                    </Container>
                </main>
                <footer className="mt-auto py-3 bg-body-tertiary">
                    <Container>
                        <small className="text-body-secondary">Todos os direitos reservados</small>
                    </Container>
                </footer>
            </div>
        </>
    )
}
