const grpc = require("grpc");

function unaryChat(call) {
  // ctx.setStatus({'trailer': 'value'});
  // ctx.throw(new Error('custom error message'));
  // console.log(ctx.metadata);
  // console.log(ctx.body);
  // ctx.setTrailer({'hello': 'trailer'})
  // ctx.setMeta({'hello': 'world'})
  // ctx.send({message: 'what\'s up'});
  // throw new Error("uncaught error");
  call.send({ message: "it works" });
}

function serverStream(call) {
  // console.log(context);
  call.set({ server: "streamed metadata" });
  let count = 0;
  setInterval(() => {
    count += 1;
    call.send({ message: " World" + count });
  }, 1000);
}

function clientStream(call) {
  // console.log(context.__proto__);
  // console.log('serverStream context: ', context);
  // console.log(context.metadata, context.metaData);
  console.log(call.head);
  call.set({ please: "work", dear: "dog" });
  // console.log(call.metadata);
  call.on("data", data => {
    console.log(data);
  });
  setTimeout(() => call.send({ message: "world" }), 5000);

}

function bidiChat(call) {
  // console.log('context keys', Object.keys(context));
  // console.log('context proto', context.__proto__)

  context.on("data", data => {
    console.log("data:", data);
    context.write({ message: data.message + " World" });
  });
  // context.throw(new Error("error"));
  setTimeout(() => {
    context.end();
  }, 3000);
}

module.exports = {
  unaryChat,
  bidiChat,
  clientStream,
  serverStream
};
