// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v3.20.3
// source: proto/any.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Any } from "../google/protobuf/any";

export const protobufPackage = "";

export interface ValueAny {
  value: Any | undefined;
}

function createBaseValueAny(): ValueAny {
  return { value: undefined };
}

export const ValueAny: MessageFns<ValueAny> = {
  encode(message: ValueAny, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.value !== undefined) {
      Any.encode(message.value, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ValueAny {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValueAny();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.value = Any.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValueAny {
    return { value: isSet(object.value) ? Any.fromJSON(object.value) : undefined };
  },

  toJSON(message: ValueAny): unknown {
    const obj: any = {};
    if (message.value !== undefined) {
      obj.value = Any.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValueAny>, I>>(base?: I): ValueAny {
    return ValueAny.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValueAny>, I>>(object: I): ValueAny {
    const message = createBaseValueAny();
    message.value = (object.value !== undefined && object.value !== null) ? Any.fromPartial(object.value) : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
