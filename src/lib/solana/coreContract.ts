import { Idl } from "@coral-xyz/anchor";

export type CoreContract = {
  address: "HRb5XsLvqUg5WRwCuXyS4sgwPHnkU8LkJkLbme2RyYMX";
  metadata: {
    name: "coreContract";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "initWallet";
      discriminator: [141, 132, 233, 130, 168, 183, 10, 119];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "user";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 115];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "encodedUserId";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "user";
      discriminator: [159, 117, 95, 227, 239, 151, 58, 236];
    }
  ];
  events: [
    {
      name: "initWalletEvent";
      discriminator: [64, 166, 238, 197, 170, 20, 42, 177];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "unknownError";
      msg: "Uknown Error";
    }
  ];
  types: [
    {
      name: "initWalletEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "key";
            type: "pubkey";
          },
          {
            name: "encodedUserId";
            type: "string";
          }
        ];
      };
    },
    {
      name: "user";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "balance";
            type: "u128";
          }
        ];
      };
    }
  ];
};

export const IDL: Idl = {
  address: "HRb5XsLvqUg5WRwCuXyS4sgwPHnkU8LkJkLbme2RyYMX",
  metadata: {
    name: "core_contract",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "init_wallet",
      discriminator: [141, 132, 233, 130, 168, 183, 10, 119],
      accounts: [
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "user",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114, 115],
              },
              {
                kind: "account",
                path: "signer",
              },
            ],
          },
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "encoded_user_id",
          type: "string",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "User",
      discriminator: [159, 117, 95, 227, 239, 151, 58, 236],
    },
  ],
  events: [
    {
      name: "InitWalletEvent",
      discriminator: [64, 166, 238, 197, 170, 20, 42, 177],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "UnknownError",
      msg: "Uknown Error",
    },
  ],
  types: [
    {
      name: "InitWalletEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: "pubkey",
          },
          {
            name: "encoded_user_id",
            type: "string",
          },
        ],
      },
    },
    {
      name: "User",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "balance",
            type: "u128",
          },
        ],
      },
    },
  ],
};
