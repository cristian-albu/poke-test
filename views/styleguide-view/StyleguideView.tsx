"use client";
import { Checkbox, TextInput } from "@/components/inputs";
import { Button, Container, Section } from "@/components/layout";
import React from "react";
import { FaSearch } from "react-icons/fa";

const StyleguideView = () => {
  return (
    <Section>
      <Container>
        <TextInput>Text input with label</TextInput>

        <TextInput icon={<FaSearch />} />

        <fieldset>
          <Checkbox>Checkbox 1</Checkbox>
          <Checkbox>Checkbox 1</Checkbox>
          <Checkbox>Checkbox 1</Checkbox>
        </fieldset>

        <Button>Button</Button>
      </Container>
    </Section>
  );
};

export default StyleguideView;
