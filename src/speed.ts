import { DoubleList, StringList, Value, Value2 } from "../proto/test";
import { ValueAny } from "../proto/any";

const ITERATIONS = 30_000; // number of repeats in benchmark test

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
  const doubles = Array.from({ length: 10 }, (_, i) => i * 0.1);
  const strings = Array.from({ length: 10 }, (_, i) => `str${i}`);

  const bufferDoubleList = DoubleList.encode({
    values: doubles,
  }).finish();
  const bufferStringList = StringList.encode({
    values: strings,
  }).finish();

  const value = Value.fromJSON({
    doubleList: { values: doubles },
  });

  const value2 = Value2.fromJSON({
    doubleList: doubles,
  });

  const valueAnyDoubleList = ValueAny.fromJSON({
    value: {
      typeUrl: "type.googleapis.com/test.DoubleList",
      value: bufferDoubleList,
    },
  });

  const stringValue = Value.fromJSON({
    stringList: { values: strings },
  });

  const stringValue2 = Value2.fromJSON({
    stringList: strings,
  });

  const valueAnyStringList = ValueAny.fromJSON({
    value: {
      typeUrl: "type.googleapis.com/test.DoubleList",
      value: bufferStringList,
    },
  });

  const bufferValue = Value.encode(value).finish();
  const bufferValue2 = Value2.encode(value2).finish();
  const bufferValueAnyDoubleList = ValueAny.encode(valueAnyDoubleList).finish();
  const bufferStringValue = Value.encode(stringValue).finish();
  const bufferStringValue2 = Value2.encode(stringValue2).finish();
  const bufferValueAnyStringList = ValueAny.encode(valueAnyStringList).finish();

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
    "DoubleList.encode({ values: doubles }).finish()",
    () => {
      DoubleList.encode({ values: doubles }).finish();
    },
    ITERATIONS
  );

  benchmark(
    "ValueAny.encode() - doubles (skips the 'value' serializaiton)",
    () => {
      ValueAny.encode(valueAnyDoubleList).finish();
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

  benchmark(
    "StringList.encode({ values: strings }).finish()",
    () => {
      StringList.encode({ values: strings }).finish();
    },
    ITERATIONS
  );

  benchmark(
    "ValueAny.encode() - strings (skips the 'value' serializaiton)",
    () => {
      ValueAny.encode(valueAnyStringList).finish();
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
    "DoubleList.decode()",
    () => {
      DoubleList.decode(bufferDoubleList);
    },
    ITERATIONS
  );

  benchmark(
    "ValueAny.decode() - doubles",
    () => {
      ValueAny.decode(bufferValueAnyDoubleList);
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

  benchmark(
    "StringList.decode()",
    () => {
      StringList.decode(bufferStringList);
    },
    ITERATIONS
  );

  benchmark(
    "ValueAny.decode() - strings",
    () => {
      ValueAny.decode(bufferValueAnyStringList);
    },
    ITERATIONS
  );
}

main();
