# grpc_testing

Testing alternative proto message definitons. De/serialization speed and encoded message size

# How to Run

## Performance

Run `npm run speed` for serialization/deserializations performance test.
Make sure to run this command multiple times (or increase number of iterations).
Feel free to play with the values (number of iterations etc.)

### Results

(for 1_000 length of array, 100_000 iterations)

--- Benchmark: Serialization ---

- Value.encode(): 87089.96ms for 100000 iterations (0.8709 ms/op)
- Value2.encode(): 86653.38ms for 100000 iterations (0.8665 ms/op)
- StringValue.encode(): 155059.71ms for 100000 iterations (1.5506 ms/op)
- StringValue2.encode(): 159564.20ms for 100000 iterations (1.5956 ms/op)

--- Benchmark: Deserialization ---

- Value.decode(): 1278.89ms for 100000 iterations (0.0128 ms/op)
- Value2.decode(): 1274.17ms for 100000 iterations (0.0127 ms/op)
- StringValue.decode(): 27334.27ms for 100000 iterations (0.2733 ms/op)
- StringValue2.decode(): 28574.36ms for 100000 iterations (0.2857 ms/op)

## Size

Run `npm run size` for serialized message size.

### Results

#### Length of arrays: 100

- Value (DoubleList inside oneof) size: 806 bytes
- Value2 (direct repeated double) size: 803 bytes
- Value (StringList inside oneof) size: 693 bytes
- Value2 (direct repeated string) size: 692 bytes

#### Length of arrays: 10_000

- Value (DoubleList inside oneof) size: 80008 bytes
- Value2 (direct repeated double) size: 80004 bytes
- Value (StringList inside oneof) size: 88894 bytes
- Value2 (direct repeated string) size: 88892 bytes

# Todo

- parallel execution of tests
- saving results in csv
- summary of which value won and what maring (percentage)
