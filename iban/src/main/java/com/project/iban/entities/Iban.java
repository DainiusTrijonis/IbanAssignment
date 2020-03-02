package com.project.iban.entities;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Iban {
    private String iban;
    private List<Character> letters = Arrays.asList('0','1','2','3','4','5','6','7','8','9',
            'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
            'S','T','U','V','W','X','Y','Z');

    public Iban(String iban) {
        this.iban = iban;
    }

    public String getIban() {
        return iban;
    }

    public Boolean validateIban() {
        if(countryCharsValid()) {
            BigDecimal remainder = convertIban().remainder(BigDecimal.valueOf(97));
            if(remainder.equals(BigDecimal.valueOf(1))) {
                return true;
            }
        }
        return false;
    }

    private Boolean countryCharsValid() {
        String ibanCountryCode = iban.substring(0,2);
        Countries countries = new Countries();
        for ( int i=0; i<countries.getCodes().length; i++ ) {
            if(ibanCountryCode.equals( countries.getCode(i) )) {
                if(countries.getChar(i) == iban.length()) {
                    return true;
                }
            }
        }
        return false;
    }
    private BigDecimal convertIban() {
        String ibanRearranged = iban.substring(4) + iban.substring(0,4);
        String ibanConverted="";
        List<Character> ibanChars = ibanRearranged.chars()
                .mapToObj( e -> (char)e)
                .collect(Collectors.toList());
        for ( Character letter : ibanChars ) {
            for(int i = 0; i<letters.size(); i++) {
                if(letter == letters.get(i)) {
                    ibanConverted = ibanConverted + i;
                }
            }
        }
        return new BigDecimal(ibanConverted);
    }
}