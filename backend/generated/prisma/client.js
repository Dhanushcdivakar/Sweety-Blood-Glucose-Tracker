var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// backend/generated/prisma/client.ts
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// backend/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.10.1",
  "engineVersion": "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum ReadingSlot {\n  MORNING_FASTING\n  AFTER_BREAKFAST\n  AFTER_LUNCH\n  AFTER_DINNER\n}\n\nmodel User {\n  id        String    @id @default(uuid())\n  name      String\n  email     String    @unique\n  password  String\n  readings  Reading[]\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n}\n\nmodel Reading {\n  id        String      @id @default(uuid())\n  date      DateTime    @db.Date\n  slot      ReadingSlot\n  value     Int\n  userId    String\n  user      User        @relation(fields: [userId], references: [id], onDelete: Cascade)\n  createdAt DateTime    @default(now())\n  updatedAt DateTime    @updatedAt\n\n  @@unique([userId, date, slot])\n  @@index([userId, date])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"readings","kind":"object","type":"Reading","relationName":"ReadingToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null},"Reading":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"slot","kind":"enum","type":"ReadingSlot"},{"name":"value","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReadingToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","readings","_count","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Reading.findUnique","Reading.findUniqueOrThrow","Reading.findFirst","Reading.findFirstOrThrow","Reading.findMany","Reading.createOne","Reading.createMany","Reading.createManyAndReturn","Reading.updateOne","Reading.updateMany","Reading.updateManyAndReturn","Reading.upsertOne","Reading.deleteOne","Reading.deleteMany","_avg","_sum","Reading.groupBy","Reading.aggregate","AND","OR","NOT","id","date","ReadingSlot","slot","value","userId","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","name","email","password","every","some","none","userId_date_slot","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "cBQgCgQAAEcAIC4AAEQAMC8AAAkAEDAAAEQAMDEBAAAAATdAAEYAIThAAEYAIUQBAEUAIUUBAAAAAUYBAEUAIQEAAAABACALAwAATAAgLgAASQAwLwAAAwAQMAAASQAwMQEARQAhMkAARgAhNAAASjQiNQIASwAhNgEARQAhN0AARgAhOEAARgAhAQMAAGoAIAwDAABMACAuAABJADAvAAADABAwAABJADAxAQAAAAEyQABGACE0AABKNCI1AgBLACE2AQBFACE3QABGACE4QABGACFKAABIACADAAAAAwAgAQAABAAwAgAABQAgAQAAAAMAIAEAAAABACAKBAAARwAgLgAARAAwLwAACQAQMAAARAAwMQEARQAhN0AARgAhOEAARgAhRAEARQAhRQEARQAhRgEARQAhAQQAAGkAIAMAAAAJACABAAAKADACAAABACADAAAACQAgAQAACgAwAgAAAQAgAwAAAAkAIAEAAAoAMAIAAAEAIAcEAABoACAxAQAAAAE3QAAAAAE4QAAAAAFEAQAAAAFFAQAAAAFGAQAAAAEBCwAADgAgBjEBAAAAATdAAAAAAThAAAAAAUQBAAAAAUUBAAAAAUYBAAAAAQELAAAQADABCwAAEAAwBwQAAFsAIDEBAFIAITdAAFMAIThAAFMAIUQBAFIAIUUBAFIAIUYBAFIAIQIAAAABACALAAATACAGMQEAUgAhN0AAUwAhOEAAUwAhRAEAUgAhRQEAUgAhRgEAUgAhAgAAAAkAIAsAABUAIAIAAAAJACALAAAVACADAAAAAQAgEgAADgAgEwAAEwAgAQAAAAEAIAEAAAAJACADBQAAWAAgGAAAWgAgGQAAWQAgCS4AAEMAMC8AABwAEDAAAEMAMDEBADYAITdAADcAIThAADcAIUQBADYAIUUBADYAIUYBADYAIQMAAAAJACABAAAbADAXAAAcACADAAAACQAgAQAACgAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAIAwAAVwAgMQEAAAABMkAAAAABNAAAADQCNQIAAAABNgEAAAABN0AAAAABOEAAAAABAQsAACQAIAcxAQAAAAEyQAAAAAE0AAAANAI1AgAAAAE2AQAAAAE3QAAAAAE4QAAAAAEBCwAAJgAwAQsAACYAMAgDAABWACAxAQBSACEyQABTACE0AABUNCI1AgBVACE2AQBSACE3QABTACE4QABTACECAAAABQAgCwAAKQAgBzEBAFIAITJAAFMAITQAAFQ0IjUCAFUAITYBAFIAITdAAFMAIThAAFMAIQIAAAADACALAAArACACAAAAAwAgCwAAKwAgAwAAAAUAIBIAACQAIBMAACkAIAEAAAAFACABAAAAAwAgBQUAAE0AIBgAAFAAIBkAAE8AICoAAE4AICsAAFEAIAouAAA1ADAvAAAyABAwAAA1ADAxAQA2ACEyQAA3ACE0AAA4NCI1AgA5ACE2AQA2ACE3QAA3ACE4QAA3ACEDAAAAAwAgAQAAMQAwFwAAMgAgAwAAAAMAIAEAAAQAMAIAAAUAIAouAAA1ADAvAAAyABAwAAA1ADAxAQA2ACEyQAA3ACE0AAA4NCI1AgA5ACE2AQA2ACE3QAA3ACE4QAA3ACEOBQAAOwAgGAAAQgAgGQAAQgAgOQEAAAABOgEAAAAEOwEAAAAEPAEAAAABPQEAAAABPgEAAAABPwEAAAABQAEAQQAhQQEAAAABQgEAAAABQwEAAAABCwUAADsAIBgAAEAAIBkAAEAAIDlAAAAAATpAAAAABDtAAAAABDxAAAAAAT1AAAAAAT5AAAAAAT9AAAAAAUBAAD8AIQcFAAA7ACAYAAA-ACAZAAA-ACA5AAAANAI6AAAANAg7AAAANAhAAAA9NCINBQAAOwAgGAAAOwAgGQAAOwAgKgAAPAAgKwAAOwAgOQIAAAABOgIAAAAEOwIAAAAEPAIAAAABPQIAAAABPgIAAAABPwIAAAABQAIAOgAhDQUAADsAIBgAADsAIBkAADsAICoAADwAICsAADsAIDkCAAAAAToCAAAABDsCAAAABDwCAAAAAT0CAAAAAT4CAAAAAT8CAAAAAUACADoAIQg5AgAAAAE6AgAAAAQ7AgAAAAQ8AgAAAAE9AgAAAAE-AgAAAAE_AgAAAAFAAgA7ACEIOQgAAAABOggAAAAEOwgAAAAEPAgAAAABPQgAAAABPggAAAABPwgAAAABQAgAPAAhBwUAADsAIBgAAD4AIBkAAD4AIDkAAAA0AjoAAAA0CDsAAAA0CEAAAD00IgQ5AAAANAI6AAAANAg7AAAANAhAAAA-NCILBQAAOwAgGAAAQAAgGQAAQAAgOUAAAAABOkAAAAAEO0AAAAAEPEAAAAABPUAAAAABPkAAAAABP0AAAAABQEAAPwAhCDlAAAAAATpAAAAABDtAAAAABDxAAAAAAT1AAAAAAT5AAAAAAT9AAAAAAUBAAEAAIQ4FAAA7ACAYAABCACAZAABCACA5AQAAAAE6AQAAAAQ7AQAAAAQ8AQAAAAE9AQAAAAE-AQAAAAE_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"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("node:buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// backend/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReadingScalarFieldEnum: () => ReadingScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.10.1",
  engine: "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Reading: "Reading"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReadingScalarFieldEnum = {
  id: "id",
  date: "date",
  slot: "slot",
  value: "value",
  userId: "userId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var defineExtension = runtime2.Extensions.defineExtension;

// backend/generated/prisma/enums.ts
var enums_exports = {};
__export(enums_exports, {
  ReadingSlot: () => ReadingSlot
});
var ReadingSlot = {
  MORNING_FASTING: "MORNING_FASTING",
  AFTER_BREAKFAST: "AFTER_BREAKFAST",
  AFTER_LUNCH: "AFTER_LUNCH",
  AFTER_DINNER: "AFTER_DINNER"
};

// backend/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();
export {
  enums_exports as $Enums,
  prismaNamespace_exports as Prisma,
  PrismaClient,
  ReadingSlot
};
