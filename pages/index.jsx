import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import Container from "./../components/Container/Container";
import Card from "./../components/Card/Card";
import Input from "../components/Input/Input";

export default function Home() {
  return (
    <Container>
      <Input
        iconPos="both"
        icon="logo"
        id="test"
        placeholder="Email"
        label="Label"
      />
    </Container>
  );
}
