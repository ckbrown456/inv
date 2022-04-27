import * as React from 'react';
import Support from "./Support"
import Container from '@mui/material/Container';

export default function Faq(props) {
  return (
    <Container component="main" maxWidth="m">
    
      <Support organization={props.organization} name={props.name} />
    </Container>
  );
}