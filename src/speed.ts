import { Value, Value2 } from "../proto/test";

const ITERATIONS = 10_000; // number of repeats in benchmark test

function prepareData() {
  const doubles = Array.from({ length: 1000 }, (_, i) => i * 0.1);
  const strings = Array.from({ length: 1000 }, (_, i) => `str${i}`);

  const value = Value.fromJSON({
    doubleList: { values: doubles },
  });

  const value2 = Value2.fromJSON({
    doubleList: doubles,
  });

  const stringValue = Value.fromJSON({
    stringList: { values: strings },
  });

  const stringValue2 = Value2.fromJSON({
    stringList: strings,
  });

  return { value, value2, stringValue, stringValue2 };
}

function benchmark(label: string, fn: () => void, iterations: number) {
  const start = process.hrtime.bigint();

  for (let i = 0; i < iterations; i++) {
    fn();
  }

  const end = process.hrtime.bigint();
  const durationMs = Number(end - start) / 1_000_000;

  console.log(
    `${label}: ${durationMs.toFixed(2)}ms for ${iterations} iterations (${(
      durationMs / iterations
    ).toFixed(4)} ms/op)`
  );
}

function main() {
  const { value, value2, stringValue, stringValue2 } = prepareData();

  const bufferValue = Value.encode(value).finish();
  const bufferValue2 = Value2.encode(value2).finish();
  const bufferStringValue = Value.encode(stringValue).finish();
  const bufferStringValue2 = Value2.encode(stringValue2).finish();

  console.log("--- Benchmark: Serialization ---");
  benchmark(
    "Value.encode()",
    () => {
      Value.encode(value).finish();
    },
    ITERATIONS
  );

  benchmark(
    "Value2.encode()",
    () => {
      Value2.encode(value2).finish();
    },
    ITERATIONS
  );

  benchmark(
    "StringValue.encode()",
    () => {
      Value.encode(stringValue).finish();
    },
    ITERATIONS
  );

  benchmark(
    "StringValue2.encode()",
    () => {
      Value2.encode(stringValue2).finish();
    },
    ITERATIONS
  );

  console.log("\n--- Benchmark: Deserialization ---");
  benchmark(
    "Value.decode()",
    () => {
      Value.decode(bufferValue);
    },
    ITERATIONS
  );

  benchmark(
    "Value2.decode()",
    () => {
      Value2.decode(bufferValue2);
    },
    ITERATIONS
  );

  benchmark(
    "StringValue.decode()",
    () => {
      Value.decode(bufferStringValue);
    },
    ITERATIONS
  );

  benchmark(
    "StringValue2.decode()",
    () => {
      Value2.decode(bufferStringValue2);
    },
    ITERATIONS
  );
}

main();
