import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import Input from "../components/Input/Input";
import Row from "../components/Row/Row";
import Spinner from "../components/Spinner/Spinner";
import Container from "./../components/Container/Container";

export default function Home() {
  return (
    <Container>
      <Header variant="auth" />
      {/* <h2>Non auth</h2>
      <Header variant="nonAuth" /> */}
    </Container>
  );
}
