package com.project.iban.entities;

public class Countries {
    private String[] codes = {"AL","AD","AT","AZ","BH","BY","BE","BA","BR","BG","CR","HR","CY","CZ","DK","DO","TL","EE",
            "FO","FI","FR","GE","DE","GI","GR","GL","GT","HU","IS","IQ","IE","IL","IT","JO",
            "KZ","XK","KW","LV","LB","LI","LT","LU","MK","MT","MR","MU","MC","MD","ME","NL","NO","PK",
            "PS","PL","PT","QA","RO","LC","SM","SA","RS","SC","SK","SI","ES","SE","CH",
            "TN","TR","UA","AE","GB","VA","VG" };
    private int[] chars = {28,24,20,28,22,28,16,20,29,22,22,21,28,24,18,28,23,20,18,18,27,22,22,23,27,18,28,28,26,23,22,
            23,27,30,20,20,30,21,28,21,20,20,19,31,27,30,27,24,22,18,15,24,29,28,25,29,24,32,27,24,22,31,
            24,19,24,24,21,24,26,29,23,22,22,24};

    public Countries() {
    }

    public String[] getCodes() {
        return codes;
    }

    public int[] getChars() {
        return chars;
    }

    public String getCode(int i ) {
        return codes[i];
    }

    public int getChar(int i) {
        return chars[i];
    }
}