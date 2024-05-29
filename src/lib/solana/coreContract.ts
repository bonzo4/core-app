import { Idl } from "@coral-xyz/anchor";

/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/core_contract.json`.
 */
export type CoreContract = {
  address: "EDsnYhy4sMajXq692iqPT6XCxr5HyHUrbAANst8MMFjA";
  metadata: {
    name: "coreContract";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "addMember";
      discriminator: [13, 116, 123, 130, 126, 198, 57, 34];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "team";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109];
              },
              {
                kind: "arg";
                path: "options.team_id";
              }
            ];
          };
        },
        {
          name: "teamMember";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109, 95, 109, 101, 109, 98, 101, 114];
              },
              {
                kind: "arg";
                path: "options.team_id";
              },
              {
                kind: "arg";
                path: "options.user_id";
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
          name: "options";
          type: {
            defined: {
              name: "addMemberOptions";
            };
          };
        }
      ];
    },
    {
      name: "claim";
      discriminator: [62, 198, 214, 193, 213, 159, 108, 210];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "recipientUsdcAccount";
          writable: true;
        },
        {
          name: "user";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114];
              },
              {
                kind: "arg";
                path: "options.user_id";
              }
            ];
          };
        },
        {
          name: "userVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "usdcMint";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "options";
          type: {
            defined: {
              name: "claimOptions";
            };
          };
        }
      ];
    },
    {
      name: "createTeamInvoice";
      discriminator: [77, 83, 133, 237, 62, 203, 142, 75];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "team";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109];
              },
              {
                kind: "arg";
                path: "options.team_id";
              }
            ];
          };
        },
        {
          name: "invoice";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  116,
                  101,
                  97,
                  109,
                  95,
                  105,
                  110,
                  118,
                  111,
                  105,
                  99,
                  101
                ];
              },
              {
                kind: "arg";
                path: "options.team_id";
              },
              {
                kind: "arg";
                path: "options.invoice_id";
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
          name: "options";
          type: {
            defined: {
              name: "createTeamInvoiceOptions";
            };
          };
        }
      ];
    },
    {
      name: "createUserInvoice";
      discriminator: [11, 54, 186, 86, 178, 207, 91, 226];
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
                value: [117, 115, 101, 114];
              },
              {
                kind: "arg";
                path: "options.user_id";
              }
            ];
          };
        },
        {
          name: "invoice";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  105,
                  110,
                  118,
                  111,
                  105,
                  99,
                  101
                ];
              },
              {
                kind: "arg";
                path: "options.user_id";
              },
              {
                kind: "arg";
                path: "options.invoice_id";
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
          name: "options";
          type: {
            defined: {
              name: "createUserInvoiceOptions";
            };
          };
        }
      ];
    },
    {
      name: "editMember";
      discriminator: [83, 15, 230, 159, 240, 72, 114, 124];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "team";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109];
              },
              {
                kind: "arg";
                path: "options.team_id";
              }
            ];
          };
        },
        {
          name: "teamMember";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109, 95, 109, 101, 109, 98, 101, 114];
              },
              {
                kind: "arg";
                path: "options.team_id";
              },
              {
                kind: "arg";
                path: "options.user_id";
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
          name: "options";
          type: {
            defined: {
              name: "editMemberOptions";
            };
          };
        }
      ];
    },
    {
      name: "editUser";
      discriminator: [154, 159, 198, 79, 53, 229, 58, 80];
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
                value: [117, 115, 101, 114];
              },
              {
                kind: "arg";
                path: "options.user_id";
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
          name: "options";
          type: {
            defined: {
              name: "editUserOptions";
            };
          };
        }
      ];
    },
    {
      name: "initTeam";
      discriminator: [64, 118, 180, 26, 250, 42, 153, 57];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "team";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109];
              },
              {
                kind: "arg";
                path: "teamId";
              }
            ];
          };
        },
        {
          name: "userVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109, 95, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "team";
              }
            ];
          };
        },
        {
          name: "usdcMint";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "teamId";
          type: "u64";
        }
      ];
    },
    {
      name: "initUser";
      discriminator: [14, 51, 68, 159, 237, 78, 158, 102];
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
                value: [117, 115, 101, 114];
              },
              {
                kind: "arg";
                path: "userId";
              }
            ];
          };
        },
        {
          name: "userVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "usdcMint";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "userId";
          type: "string";
        }
      ];
    },
    {
      name: "leaveTeam";
      discriminator: [10, 158, 72, 167, 4, 75, 99, 87];
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
                value: [117, 115, 101, 114];
              },
              {
                kind: "arg";
                path: "options.user_id";
              }
            ];
          };
        },
        {
          name: "teamMember";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109, 95, 109, 101, 109, 98, 101, 114];
              },
              {
                kind: "arg";
                path: "options.team_id";
              },
              {
                kind: "arg";
                path: "options.user_id";
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
          name: "options";
          type: {
            defined: {
              name: "leaveTeamOptions";
            };
          };
        }
      ];
    },
    {
      name: "payMember";
      discriminator: [163, 140, 118, 4, 75, 195, 63, 174];
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
                value: [117, 115, 101, 114];
              },
              {
                kind: "arg";
                path: "options.user_id";
              }
            ];
          };
        },
        {
          name: "userVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "team";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109];
              },
              {
                kind: "arg";
                path: "options.team_id";
              }
            ];
          };
        },
        {
          name: "teamVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109, 95, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "team";
              }
            ];
          };
        },
        {
          name: "teamMember";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109, 95, 109, 101, 109, 98, 101, 114];
              },
              {
                kind: "arg";
                path: "options.team_id";
              },
              {
                kind: "arg";
                path: "options.user_id";
              }
            ];
          };
        },
        {
          name: "usdcMint";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "options";
          type: {
            defined: {
              name: "payMemberOptions";
            };
          };
        }
      ];
    },
    {
      name: "payTeam";
      discriminator: [241, 250, 123, 105, 241, 14, 50, 236];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "usdcPayerAccount";
          writable: true;
        },
        {
          name: "team";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109];
              },
              {
                kind: "arg";
                path: "options.team_id";
              }
            ];
          };
        },
        {
          name: "teamVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109, 95, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "team";
              }
            ];
          };
        },
        {
          name: "usdcMint";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "options";
          type: {
            defined: {
              name: "payTeamOptions";
            };
          };
        }
      ];
    },
    {
      name: "payTeamInvoice";
      discriminator: [2, 69, 101, 14, 160, 247, 139, 183];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "usdcPayerAccount";
          writable: true;
        },
        {
          name: "team";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109];
              },
              {
                kind: "arg";
                path: "options.team_id";
              }
            ];
          };
        },
        {
          name: "teamVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109, 95, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "team";
              }
            ];
          };
        },
        {
          name: "invoice";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  116,
                  101,
                  97,
                  109,
                  95,
                  105,
                  110,
                  118,
                  111,
                  105,
                  99,
                  101
                ];
              },
              {
                kind: "arg";
                path: "options.team_id";
              },
              {
                kind: "arg";
                path: "options.invoice_id";
              }
            ];
          };
        },
        {
          name: "usdcMint";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "options";
          type: {
            defined: {
              name: "payTeamInvoiceOptions";
            };
          };
        }
      ];
    },
    {
      name: "payUser";
      discriminator: [28, 121, 78, 180, 208, 134, 75, 222];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "usdcPayerAccount";
          writable: true;
        },
        {
          name: "payerUser";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114];
              },
              {
                kind: "arg";
                path: "options.payer_user_id";
              }
            ];
          };
        },
        {
          name: "user";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114];
              },
              {
                kind: "arg";
                path: "options.user_id";
              }
            ];
          };
        },
        {
          name: "userVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "usdcMint";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "options";
          type: {
            defined: {
              name: "payUserOptions";
            };
          };
        }
      ];
    },
    {
      name: "payUserInvoice";
      discriminator: [208, 39, 24, 65, 192, 178, 130, 252];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "usdcPayerAccount";
          writable: true;
        },
        {
          name: "user";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114];
              },
              {
                kind: "arg";
                path: "options.user_id";
              }
            ];
          };
        },
        {
          name: "userVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "invoice";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  105,
                  110,
                  118,
                  111,
                  105,
                  99,
                  101
                ];
              },
              {
                kind: "arg";
                path: "options.user_id";
              },
              {
                kind: "arg";
                path: "options.invoice_id";
              }
            ];
          };
        },
        {
          name: "usdcMint";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "options";
          type: {
            defined: {
              name: "payUserInvoiceOptions";
            };
          };
        }
      ];
    },
    {
      name: "removeMember";
      discriminator: [171, 57, 231, 150, 167, 128, 18, 55];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "team";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109];
              },
              {
                kind: "arg";
                path: "options.team_id";
              }
            ];
          };
        },
        {
          name: "teamMember";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 101, 97, 109, 95, 109, 101, 109, 98, 101, 114];
              },
              {
                kind: "arg";
                path: "options.team_id";
              },
              {
                kind: "arg";
                path: "options.user_id";
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
          name: "options";
          type: {
            defined: {
              name: "removeMemberOptions";
            };
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "team";
      discriminator: [140, 218, 177, 140, 193, 241, 199, 106];
    },
    {
      name: "teamInvoice";
      discriminator: [61, 121, 200, 131, 222, 119, 142, 67];
    },
    {
      name: "teamMember";
      discriminator: [45, 32, 135, 109, 75, 252, 204, 244];
    },
    {
      name: "user";
      discriminator: [159, 117, 95, 227, 239, 151, 58, 236];
    },
    {
      name: "userInvoice";
      discriminator: [233, 224, 227, 169, 73, 205, 52, 125];
    }
  ];
  events: [
    {
      name: "addMemberEvent";
      discriminator: [234, 77, 76, 41, 132, 251, 177, 219];
    },
    {
      name: "claimEvent";
      discriminator: [93, 15, 70, 170, 48, 140, 212, 219];
    },
    {
      name: "editMemberEvent";
      discriminator: [90, 126, 137, 249, 155, 88, 252, 68];
    },
    {
      name: "editUserEvent";
      discriminator: [96, 187, 241, 146, 102, 250, 118, 158];
    },
    {
      name: "leaveTeamEvent";
      discriminator: [73, 209, 233, 199, 205, 220, 83, 180];
    },
    {
      name: "memberRemoved";
      discriminator: [250, 66, 3, 113, 161, 10, 59, 39];
    },
    {
      name: "payMemberEvent";
      discriminator: [126, 46, 28, 207, 105, 254, 220, 173];
    },
    {
      name: "payTeamEvent";
      discriminator: [4, 88, 131, 226, 143, 14, 175, 105];
    },
    {
      name: "payUserEvent";
      discriminator: [9, 24, 70, 11, 84, 221, 15, 66];
    },
    {
      name: "teamCreated";
      discriminator: [172, 52, 201, 62, 192, 159, 66, 49];
    },
    {
      name: "teamInvoiceCreated";
      discriminator: [119, 71, 204, 111, 33, 247, 220, 177];
    },
    {
      name: "teamInvoicePaid";
      discriminator: [254, 8, 132, 198, 168, 209, 3, 157];
    },
    {
      name: "userCreated";
      discriminator: [145, 177, 42, 214, 0, 65, 40, 69];
    },
    {
      name: "userInvoiceCreated";
      discriminator: [208, 156, 185, 225, 196, 184, 235, 28];
    },
    {
      name: "userInvoicePaid";
      discriminator: [59, 208, 242, 195, 207, 253, 181, 202];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "unknownError";
      msg: "Uknown Error.";
    },
    {
      code: 6001;
      name: "notAuthorized";
      msg: "You are not Authorized to perform this action.";
    },
    {
      code: 6002;
      name: "balanceTooLow";
      msg: "Balance too low.";
    },
    {
      code: 6003;
      name: "invoicePaid";
      msg: "Invoice already paid.";
    }
  ];
  types: [
    {
      name: "addMemberEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userId";
            type: "string";
          },
          {
            name: "teamId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "addMemberOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userId";
            type: "string";
          },
          {
            name: "teamId";
            type: "u64";
          },
          {
            name: "intialPay";
            type: "u128";
          }
        ];
      };
    },
    {
      name: "claimEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "claimId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "claimOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userId";
            type: "string";
          },
          {
            name: "claimId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "createTeamInvoiceOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "teamId";
            type: "u64";
          },
          {
            name: "invoiceId";
            type: "u64";
          },
          {
            name: "requestedAmount";
            type: "u128";
          }
        ];
      };
    },
    {
      name: "createUserInvoiceOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userId";
            type: "string";
          },
          {
            name: "invoiceId";
            type: "u64";
          },
          {
            name: "requestedAmount";
            type: "u128";
          }
        ];
      };
    },
    {
      name: "editMemberEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "editId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "editMemberOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userId";
            type: "string";
          },
          {
            name: "teamId";
            type: "u64";
          },
          {
            name: "editId";
            type: "u64";
          },
          {
            name: "newPay";
            type: "u128";
          }
        ];
      };
    },
    {
      name: "editUserEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "editId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "editUserOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userId";
            type: "string";
          },
          {
            name: "editId";
            type: "u64";
          },
          {
            name: "newAuthority";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "leaveTeamEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "leaveId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "leaveTeamOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userId";
            type: "string";
          },
          {
            name: "leaveId";
            type: "u64";
          },
          {
            name: "teamId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "memberRemoved";
      type: {
        kind: "struct";
        fields: [
          {
            name: "removeId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "payMemberEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "paymentId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "payMemberOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "teamId";
            type: "u64";
          },
          {
            name: "userId";
            type: "string";
          },
          {
            name: "paymentId";
            type: "u64";
          },
          {
            name: "amount";
            type: {
              option: "u128";
            };
          }
        ];
      };
    },
    {
      name: "payTeamEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "paymentId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "payTeamInvoiceOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "teamId";
            type: "u64";
          },
          {
            name: "invoiceId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "payTeamOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "teamId";
            type: "u64";
          },
          {
            name: "paymentId";
            type: "u64";
          },
          {
            name: "amount";
            type: "u128";
          }
        ];
      };
    },
    {
      name: "payUserEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "paymentId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "payUserInvoiceOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userId";
            type: "string";
          },
          {
            name: "invoiceId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "payUserOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userId";
            type: "string";
          },
          {
            name: "payerUserId";
            type: "string";
          },
          {
            name: "paymentId";
            type: "u64";
          },
          {
            name: "amount";
            type: "u128";
          }
        ];
      };
    },
    {
      name: "removeMemberOptions";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userId";
            type: "string";
          },
          {
            name: "teamId";
            type: "u64";
          },
          {
            name: "removeId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "team";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "balance";
            type: "u128";
          }
        ];
      };
    },
    {
      name: "teamCreated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "teamId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "teamInvoice";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "requestedAmount";
            type: "u128";
          },
          {
            name: "isPaid";
            type: "bool";
          },
          {
            name: "teamId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "teamInvoiceCreated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "invoiceId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "teamInvoicePaid";
      type: {
        kind: "struct";
        fields: [
          {
            name: "invoiceId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "teamMember";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "pay";
            type: "u128";
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
            name: "authority";
            type: "pubkey";
          },
          {
            name: "balance";
            type: "u128";
          }
        ];
      };
    },
    {
      name: "userCreated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userId";
            type: "string";
          }
        ];
      };
    },
    {
      name: "userInvoice";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "requestedAmount";
            type: "u128";
          },
          {
            name: "isPaid";
            type: "bool";
          },
          {
            name: "userId";
            type: "string";
          }
        ];
      };
    },
    {
      name: "userInvoiceCreated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "invoiceId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "userInvoicePaid";
      type: {
        kind: "struct";
        fields: [
          {
            name: "invoiceId";
            type: "u64";
          }
        ];
      };
    }
  ];
};

export const IDL: Idl = {
  address: "EDsnYhy4sMajXq692iqPT6XCxr5HyHUrbAANst8MMFjA",
  metadata: {
    name: "core_contract",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "add_member",
      discriminator: [13, 116, 123, 130, 126, 198, 57, 34],
      accounts: [
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "team",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
            ],
          },
        },
        {
          name: "team_member",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109, 95, 109, 101, 109, 98, 101, 114],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
              {
                kind: "arg",
                path: "options.user_id",
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
          name: "options",
          type: {
            defined: {
              name: "AddMemberOptions",
            },
          },
        },
      ],
    },
    {
      name: "claim",
      discriminator: [62, 198, 214, 193, 213, 159, 108, 210],
      accounts: [
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "recipient_usdc_account",
          writable: true,
        },
        {
          name: "user",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114],
              },
              {
                kind: "arg",
                path: "options.user_id",
              },
            ],
          },
        },
        {
          name: "user_vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114, 95, 118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "user",
              },
            ],
          },
        },
        {
          name: "usdc_mint",
          writable: true,
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "options",
          type: {
            defined: {
              name: "ClaimOptions",
            },
          },
        },
      ],
    },
    {
      name: "create_team_invoice",
      discriminator: [77, 83, 133, 237, 62, 203, 142, 75],
      accounts: [
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "team",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
            ],
          },
        },
        {
          name: "invoice",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  116, 101, 97, 109, 95, 105, 110, 118, 111, 105, 99, 101,
                ],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
              {
                kind: "arg",
                path: "options.invoice_id",
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
          name: "options",
          type: {
            defined: {
              name: "CreateTeamInvoiceOptions",
            },
          },
        },
      ],
    },
    {
      name: "create_user_invoice",
      discriminator: [11, 54, 186, 86, 178, 207, 91, 226],
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
                value: [117, 115, 101, 114],
              },
              {
                kind: "arg",
                path: "options.user_id",
              },
            ],
          },
        },
        {
          name: "invoice",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  117, 115, 101, 114, 95, 105, 110, 118, 111, 105, 99, 101,
                ],
              },
              {
                kind: "arg",
                path: "options.user_id",
              },
              {
                kind: "arg",
                path: "options.invoice_id",
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
          name: "options",
          type: {
            defined: {
              name: "CreateUserInvoiceOptions",
            },
          },
        },
      ],
    },
    {
      name: "edit_member",
      discriminator: [83, 15, 230, 159, 240, 72, 114, 124],
      accounts: [
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "team",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
            ],
          },
        },
        {
          name: "team_member",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109, 95, 109, 101, 109, 98, 101, 114],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
              {
                kind: "arg",
                path: "options.user_id",
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
          name: "options",
          type: {
            defined: {
              name: "EditMemberOptions",
            },
          },
        },
      ],
    },
    {
      name: "edit_user",
      discriminator: [154, 159, 198, 79, 53, 229, 58, 80],
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
                value: [117, 115, 101, 114],
              },
              {
                kind: "arg",
                path: "options.user_id",
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
          name: "options",
          type: {
            defined: {
              name: "EditUserOptions",
            },
          },
        },
      ],
    },
    {
      name: "init_team",
      discriminator: [64, 118, 180, 26, 250, 42, 153, 57],
      accounts: [
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "team",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109],
              },
              {
                kind: "arg",
                path: "team_id",
              },
            ],
          },
        },
        {
          name: "user_vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109, 95, 118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "team",
              },
            ],
          },
        },
        {
          name: "usdc_mint",
          writable: true,
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "team_id",
          type: "u64",
        },
      ],
    },
    {
      name: "init_user",
      discriminator: [14, 51, 68, 159, 237, 78, 158, 102],
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
                value: [117, 115, 101, 114],
              },
              {
                kind: "arg",
                path: "user_id",
              },
            ],
          },
        },
        {
          name: "user_vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114, 95, 118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "user",
              },
            ],
          },
        },
        {
          name: "usdc_mint",
          writable: true,
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "user_id",
          type: "string",
        },
      ],
    },
    {
      name: "leave_team",
      discriminator: [10, 158, 72, 167, 4, 75, 99, 87],
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
                value: [117, 115, 101, 114],
              },
              {
                kind: "arg",
                path: "options.user_id",
              },
            ],
          },
        },
        {
          name: "team_member",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109, 95, 109, 101, 109, 98, 101, 114],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
              {
                kind: "arg",
                path: "options.user_id",
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
          name: "options",
          type: {
            defined: {
              name: "LeaveTeamOptions",
            },
          },
        },
      ],
    },
    {
      name: "pay_member",
      discriminator: [163, 140, 118, 4, 75, 195, 63, 174],
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
                value: [117, 115, 101, 114],
              },
              {
                kind: "arg",
                path: "options.user_id",
              },
            ],
          },
        },
        {
          name: "user_vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114, 95, 118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "user",
              },
            ],
          },
        },
        {
          name: "team",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
            ],
          },
        },
        {
          name: "team_vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109, 95, 118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "team",
              },
            ],
          },
        },
        {
          name: "team_member",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109, 95, 109, 101, 109, 98, 101, 114],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
              {
                kind: "arg",
                path: "options.user_id",
              },
            ],
          },
        },
        {
          name: "usdc_mint",
          writable: true,
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "options",
          type: {
            defined: {
              name: "PayMemberOptions",
            },
          },
        },
      ],
    },
    {
      name: "pay_team",
      discriminator: [241, 250, 123, 105, 241, 14, 50, 236],
      accounts: [
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "usdc_payer_account",
          writable: true,
        },
        {
          name: "team",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
            ],
          },
        },
        {
          name: "team_vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109, 95, 118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "team",
              },
            ],
          },
        },
        {
          name: "usdc_mint",
          writable: true,
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "options",
          type: {
            defined: {
              name: "PayTeamOptions",
            },
          },
        },
      ],
    },
    {
      name: "pay_team_invoice",
      discriminator: [2, 69, 101, 14, 160, 247, 139, 183],
      accounts: [
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "usdc_payer_account",
          writable: true,
        },
        {
          name: "team",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
            ],
          },
        },
        {
          name: "team_vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109, 95, 118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "team",
              },
            ],
          },
        },
        {
          name: "invoice",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  116, 101, 97, 109, 95, 105, 110, 118, 111, 105, 99, 101,
                ],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
              {
                kind: "arg",
                path: "options.invoice_id",
              },
            ],
          },
        },
        {
          name: "usdc_mint",
          writable: true,
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "options",
          type: {
            defined: {
              name: "PayTeamInvoiceOptions",
            },
          },
        },
      ],
    },
    {
      name: "pay_user",
      discriminator: [28, 121, 78, 180, 208, 134, 75, 222],
      accounts: [
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "usdc_payer_account",
          writable: true,
        },
        {
          name: "payer_user",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114],
              },
              {
                kind: "arg",
                path: "options.payer_user_id",
              },
            ],
          },
        },
        {
          name: "user",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114],
              },
              {
                kind: "arg",
                path: "options.user_id",
              },
            ],
          },
        },
        {
          name: "user_vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114, 95, 118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "user",
              },
            ],
          },
        },
        {
          name: "usdc_mint",
          writable: true,
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "options",
          type: {
            defined: {
              name: "PayUserOptions",
            },
          },
        },
      ],
    },
    {
      name: "pay_user_invoice",
      discriminator: [208, 39, 24, 65, 192, 178, 130, 252],
      accounts: [
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "usdc_payer_account",
          writable: true,
        },
        {
          name: "user",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114],
              },
              {
                kind: "arg",
                path: "options.user_id",
              },
            ],
          },
        },
        {
          name: "user_vault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114, 95, 118, 97, 117, 108, 116],
              },
              {
                kind: "account",
                path: "user",
              },
            ],
          },
        },
        {
          name: "invoice",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  117, 115, 101, 114, 95, 105, 110, 118, 111, 105, 99, 101,
                ],
              },
              {
                kind: "arg",
                path: "options.user_id",
              },
              {
                kind: "arg",
                path: "options.invoice_id",
              },
            ],
          },
        },
        {
          name: "usdc_mint",
          writable: true,
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "options",
          type: {
            defined: {
              name: "PayUserInvoiceOptions",
            },
          },
        },
      ],
    },
    {
      name: "remove_member",
      discriminator: [171, 57, 231, 150, 167, 128, 18, 55],
      accounts: [
        {
          name: "signer",
          writable: true,
          signer: true,
        },
        {
          name: "team",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
            ],
          },
        },
        {
          name: "team_member",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [116, 101, 97, 109, 95, 109, 101, 109, 98, 101, 114],
              },
              {
                kind: "arg",
                path: "options.team_id",
              },
              {
                kind: "arg",
                path: "options.user_id",
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
          name: "options",
          type: {
            defined: {
              name: "RemoveMemberOptions",
            },
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "Team",
      discriminator: [140, 218, 177, 140, 193, 241, 199, 106],
    },
    {
      name: "TeamInvoice",
      discriminator: [61, 121, 200, 131, 222, 119, 142, 67],
    },
    {
      name: "TeamMember",
      discriminator: [45, 32, 135, 109, 75, 252, 204, 244],
    },
    {
      name: "User",
      discriminator: [159, 117, 95, 227, 239, 151, 58, 236],
    },
    {
      name: "UserInvoice",
      discriminator: [233, 224, 227, 169, 73, 205, 52, 125],
    },
  ],
  events: [
    {
      name: "AddMemberEvent",
      discriminator: [234, 77, 76, 41, 132, 251, 177, 219],
    },
    {
      name: "ClaimEvent",
      discriminator: [93, 15, 70, 170, 48, 140, 212, 219],
    },
    {
      name: "EditMemberEvent",
      discriminator: [90, 126, 137, 249, 155, 88, 252, 68],
    },
    {
      name: "EditUserEvent",
      discriminator: [96, 187, 241, 146, 102, 250, 118, 158],
    },
    {
      name: "LeaveTeamEvent",
      discriminator: [73, 209, 233, 199, 205, 220, 83, 180],
    },
    {
      name: "MemberRemoved",
      discriminator: [250, 66, 3, 113, 161, 10, 59, 39],
    },
    {
      name: "PayMemberEvent",
      discriminator: [126, 46, 28, 207, 105, 254, 220, 173],
    },
    {
      name: "PayTeamEvent",
      discriminator: [4, 88, 131, 226, 143, 14, 175, 105],
    },
    {
      name: "PayUserEvent",
      discriminator: [9, 24, 70, 11, 84, 221, 15, 66],
    },
    {
      name: "TeamCreated",
      discriminator: [172, 52, 201, 62, 192, 159, 66, 49],
    },
    {
      name: "TeamInvoiceCreated",
      discriminator: [119, 71, 204, 111, 33, 247, 220, 177],
    },
    {
      name: "TeamInvoicePaid",
      discriminator: [254, 8, 132, 198, 168, 209, 3, 157],
    },
    {
      name: "UserCreated",
      discriminator: [145, 177, 42, 214, 0, 65, 40, 69],
    },
    {
      name: "UserInvoiceCreated",
      discriminator: [208, 156, 185, 225, 196, 184, 235, 28],
    },
    {
      name: "UserInvoicePaid",
      discriminator: [59, 208, 242, 195, 207, 253, 181, 202],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "UnknownError",
      msg: "Uknown Error.",
    },
    {
      code: 6001,
      name: "NotAuthorized",
      msg: "You are not Authorized to perform this action.",
    },
    {
      code: 6002,
      name: "BalanceTooLow",
      msg: "Balance too low.",
    },
    {
      code: 6003,
      name: "InvoicePaid",
      msg: "Invoice already paid.",
    },
  ],
  types: [
    {
      name: "AddMemberEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user_id",
            type: "string",
          },
          {
            name: "team_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "AddMemberOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user_id",
            type: "string",
          },
          {
            name: "team_id",
            type: "u64",
          },
          {
            name: "intial_pay",
            type: "u128",
          },
        ],
      },
    },
    {
      name: "ClaimEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "claim_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "ClaimOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user_id",
            type: "string",
          },
          {
            name: "claim_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "CreateTeamInvoiceOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "team_id",
            type: "u64",
          },
          {
            name: "invoice_id",
            type: "u64",
          },
          {
            name: "requested_amount",
            type: "u128",
          },
        ],
      },
    },
    {
      name: "CreateUserInvoiceOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user_id",
            type: "string",
          },
          {
            name: "invoice_id",
            type: "u64",
          },
          {
            name: "requested_amount",
            type: "u128",
          },
        ],
      },
    },
    {
      name: "EditMemberEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "edit_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "EditMemberOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user_id",
            type: "string",
          },
          {
            name: "team_id",
            type: "u64",
          },
          {
            name: "edit_id",
            type: "u64",
          },
          {
            name: "new_pay",
            type: "u128",
          },
        ],
      },
    },
    {
      name: "EditUserEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "edit_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "EditUserOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user_id",
            type: "string",
          },
          {
            name: "edit_id",
            type: "u64",
          },
          {
            name: "new_authority",
            type: "pubkey",
          },
        ],
      },
    },
    {
      name: "LeaveTeamEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "leave_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "LeaveTeamOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user_id",
            type: "string",
          },
          {
            name: "leave_id",
            type: "u64",
          },
          {
            name: "team_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "MemberRemoved",
      type: {
        kind: "struct",
        fields: [
          {
            name: "remove_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "PayMemberEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "payment_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "PayMemberOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "team_id",
            type: "u64",
          },
          {
            name: "user_id",
            type: "string",
          },
          {
            name: "payment_id",
            type: "u64",
          },
          {
            name: "amount",
            type: {
              option: "u128",
            },
          },
        ],
      },
    },
    {
      name: "PayTeamEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "payment_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "PayTeamInvoiceOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "team_id",
            type: "u64",
          },
          {
            name: "invoice_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "PayTeamOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "team_id",
            type: "u64",
          },
          {
            name: "payment_id",
            type: "u64",
          },
          {
            name: "amount",
            type: "u128",
          },
        ],
      },
    },
    {
      name: "PayUserEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "payment_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "PayUserInvoiceOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user_id",
            type: "string",
          },
          {
            name: "invoice_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "PayUserOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user_id",
            type: "string",
          },
          {
            name: "payer_user_id",
            type: "string",
          },
          {
            name: "payment_id",
            type: "u64",
          },
          {
            name: "amount",
            type: "u128",
          },
        ],
      },
    },
    {
      name: "RemoveMemberOptions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user_id",
            type: "string",
          },
          {
            name: "team_id",
            type: "u64",
          },
          {
            name: "remove_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "Team",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "owner",
            type: "pubkey",
          },
          {
            name: "balance",
            type: "u128",
          },
        ],
      },
    },
    {
      name: "TeamCreated",
      type: {
        kind: "struct",
        fields: [
          {
            name: "team_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "TeamInvoice",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "requested_amount",
            type: "u128",
          },
          {
            name: "is_paid",
            type: "bool",
          },
          {
            name: "team_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "TeamInvoiceCreated",
      type: {
        kind: "struct",
        fields: [
          {
            name: "invoice_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "TeamInvoicePaid",
      type: {
        kind: "struct",
        fields: [
          {
            name: "invoice_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "TeamMember",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "pay",
            type: "u128",
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
            name: "authority",
            type: "pubkey",
          },
          {
            name: "balance",
            type: "u128",
          },
        ],
      },
    },
    {
      name: "UserCreated",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user_id",
            type: "string",
          },
        ],
      },
    },
    {
      name: "UserInvoice",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "requested_amount",
            type: "u128",
          },
          {
            name: "is_paid",
            type: "bool",
          },
          {
            name: "user_id",
            type: "string",
          },
        ],
      },
    },
    {
      name: "UserInvoiceCreated",
      type: {
        kind: "struct",
        fields: [
          {
            name: "invoice_id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "UserInvoicePaid",
      type: {
        kind: "struct",
        fields: [
          {
            name: "invoice_id",
            type: "u64",
          },
        ],
      },
    },
  ],
};
