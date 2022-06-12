package com.oepfelbaum.techassessment.digitalwallet.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.oepfelbaum.techassessment.digitalwallet.entities.BankAccount;
import com.oepfelbaum.techassessment.digitalwallet.entities.BankAccountRepository;
import com.oepfelbaum.techassessment.digitalwallet.entities.BankType;

@Component
public class DatabaseLoader implements CommandLineRunner { 

	private final BankAccountRepository repository;

	@Autowired 
	public DatabaseLoader(BankAccountRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.saveAll(Arrays.asList(
				new BankAccount("13efad7b-24f2-48ef-b524-d4951d25c7bd", "Florian", BankType.NATWEST),
				new BankAccount("a91ec5ba-b0c2-40c2-8213-dea873a1fd12", "Florian", BankType.NATWEST)));
	}
}