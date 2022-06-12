package com.oepfelbaum.techassessment.digitalwallet.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class BankAccount {
	@Id
	@GeneratedValue
	private Long id;
	private String accountIdentificationNumber;
	private String accountOwner;
	@Enumerated(EnumType.STRING)
	private BankType banktype;

	
	public BankAccount() {
		super();
	}

	public BankAccount(String accountIdentificationNumber, String accountOwner, BankType banktype) {
		super();
		this.accountIdentificationNumber = accountIdentificationNumber;
		this.accountOwner = accountOwner;
		this.banktype = banktype;
	}

	public String getAccountIdentificationNumber() {
		return accountIdentificationNumber;
	}

	public void setAccountIdentificationNumber(String accountIdentificationNumber) {
		this.accountIdentificationNumber = accountIdentificationNumber;
	}

	public String getAccountOwner() {
		return accountOwner;
	}

	public void setAccountOwner(String accountOwner) {
		this.accountOwner = accountOwner;
	}

	public BankType getBanktype() {
		return banktype;
	}

	public void setBanktype(BankType banktype) {
		this.banktype = banktype;
	}
}
