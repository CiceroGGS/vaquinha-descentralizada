// No imports needed: web3, anchor, pg and more are globally available

describe("Test", () => {
  it("shold be create a new vaquinha", async () => {
    const nameVaquinha = "Vaquinha test em TS";
    const description = "Descricao TESTE";
    const newVaquinhaKeypar = new web3.Keypair();

    const txHash = await pg.program.methods
      .createVaquinha(nameVaquinha, description)
      .accounts({
        vaquinha: newVaquinhaKeypar.publicKey,
        creator: pg.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([newVaquinhaKeypar])
      .rpc();

    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

    // Confirm transaction
    await pg.connection.confirmTransaction(txHash);

    // Fetch the created account
    const vaquinhaAccount = await pg.program.account.vaquinha.fetch(
      newVaquinhaKeypar.publicKey
    );

    console.log("On-chain data is:", vaquinhaAccount.name);

    // Check whether the data on-chain is equal to local 'data'
    assert(vaquinhaAccount.name === nameVaquinha);
    assert(vaquinhaAccount.description === description);
  });
});
