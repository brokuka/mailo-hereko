import Card from "../components/Card/Card";
import Rating from "../components/Rating/Rating";
import Container from "./../components/Container/Container";

export default function Home() {
  return (
    <Container>
      <Card />
      <Rating value={5} />
    </Container>
  );
}
