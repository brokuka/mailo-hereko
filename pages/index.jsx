import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import Container from "./../components/Container/Container";
import Card from "./../components/Card/Card";

export default function Home() {
  return (
    <Container>
      <h2>Auth</h2>
      <Header variant="auth" />
      <h2>Non auth</h2>
      <Header variant="nonAuth" />
      <Card />
      <Card isSuggesting />
    </Container>
  );
}
