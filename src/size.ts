import { ValueAny } from "../proto/any";
import { DoubleList, StringList, Value, Value2 } from "../proto/test";

function main() {
  const doubles = Array.from({ length: 100 }, (_, i) => i * 0.1); // 0.0, 0.1, 0.2, ..., 9.9
  const strings = Array.from({ length: 100 }, (_, i) => `str${i}`);

  // Build messages using fromJson
  const valueDoubleList = Value.fromJSON({
    doubleList: {
      values: doubles,
    },
  });

  const value2DoubleList = Value2.fromJSON({
    doubleList: doubles,
  });

  const valueAnyDoubleList = ValueAny.fromJSON({
    value: {
      typeUrl: "type.googleapis.com/test.DoubleList",
      value: DoubleList.encode({ values: doubles }).finish(),
    },
  });

  const valueStringList = Value.fromJSON({
    stringList: {
      values: strings,
    },
  });

  const value2StringList = Value2.fromJSON({
    stringList: strings,
  });

  const valueAnyStringList = ValueAny.fromJSON({
    value: {
      typeUrl: "type.googleapis.com/test.StringList",
      value: StringList.encode({ values: strings }).finish(),
    },
  });

  // Encode to buffer
  const bufferValueDoubleList = Value.encode(valueDoubleList).finish();
  const bufferValue2DoubleList = Value2.encode(value2DoubleList).finish();
  const bufferValueAnyDoubleList = ValueAny.encode(valueAnyDoubleList).finish();
  const bufferValueStringList = Value.encode(valueStringList).finish();
  const bufferValue2StringList = Value2.encode(value2StringList).finish();
  const bufferValueAnyStringList = ValueAny.encode(valueAnyStringList).finish();

  console.log(
    `Value (DoubleList inside oneof) size: ${bufferValueDoubleList.length} bytes`
  );
  console.log(
    `Value2 (direct repeated double) size: ${bufferValue2DoubleList.length} bytes`
  );
  console.log(
    `ValueAny (direct repeated double) size: ${bufferValueAnyDoubleList.length} bytes`
  );

  console.log(
    `Value (StringList inside oneof) size: ${bufferValueStringList.length} bytes`
  );
  console.log(
    `Value2 (direct repeated string) size: ${bufferValue2StringList.length} bytes`
  );
  console.log(
    `ValueAny (direct repeated string) size: ${bufferValueAnyStringList.length} bytes`
  );
}

main();
