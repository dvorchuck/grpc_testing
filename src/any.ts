import { ValueAny } from "../proto/any";
import { StringList } from "../proto/test";

const protobuf = require("protobufjs");

async function main() {
  const root = await protobuf.load(["proto/any.proto"]);

  const MyMessage = root.lookupType("MyMessage");
  const Container = root.lookupType("Container");
  // const Any = root.lookupType("google.protobuf.Any");
  const strings = Array.from({ length: 100 }, (_, i) => `str${i}`);

  const value = ValueAny.fromJSON({
    value: {
      type_url: "type.googleapis.com/StringList",
      value: StringList.encode({ values: strings }).finish(),
    },
  });

  // Decode
  const encoded = ValueAny.encode(value).finish();
  const decoded = ValueAny.decode(encoded);

  console.log("Decoded Container:", decoded);
}

main();
