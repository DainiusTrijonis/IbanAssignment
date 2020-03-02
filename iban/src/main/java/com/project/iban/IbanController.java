package com.project.iban;

import com.project.iban.entities.Iban;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("iban")
@CrossOrigin
public class IbanController {


    @GetMapping(value = "/{ibanNumber}", produces = "application/json")
    public Boolean getIbanValidation(@PathVariable String ibanNumber){
        Iban ibanObj = new Iban(ibanNumber);
        return ibanObj.validateIban();
    }
}
