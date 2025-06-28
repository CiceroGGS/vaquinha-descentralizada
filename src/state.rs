use anchor_lang::prelude::*;

#[account]
pub struct Vaquinha {
    pub name: String,
    pub description: String,
    pub amout_donated: u64,
    pub owner: Pubkey,
}
