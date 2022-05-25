import testDb from "./testDb.json";
import { parseText } from "../src/stringParser";

interface stringTest {
  test: string;
  expected: string;
}

interface testDbSignature {
  formattingTests: {
    textEffectTests: stringTest[];
    hyperlinkTestsNoAlt: stringTest[];
    hyperlinkTestsWithAlt: stringTest[];
    nestedTests: stringTest[];
  };
}

const testDbProper = <testDbSignature>testDb;

test("it should format text effects", () => {
  testDbProper.formattingTests.textEffectTests.forEach((x) => {
    expect(parseText(x.test)).toBe(x.expected);
  });
});

test("it should format hyperlinks with no alt text", () => {
  testDbProper.formattingTests.hyperlinkTestsNoAlt.forEach((x) => {
    expect(parseText(x.test)).toBe(x.expected);
  });
});

test("it should format hyperlinks with alt text", () => {
  testDbProper.formattingTests.hyperlinkTestsWithAlt.forEach((x) => {
    expect(parseText(x.test)).toBe(x.expected);
  });
});

test("it should format nested formatting", () => {
  testDbProper.formattingTests.nestedTests.forEach((x) => {
    expect(parseText(x.test)).toBe(x.expected);
  });
});
