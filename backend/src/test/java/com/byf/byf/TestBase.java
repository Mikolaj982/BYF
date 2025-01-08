package com.byf.byf;

import com.byf.byf.account.AccountRepository;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest(classes = TestApplication.class)
public class TestBase {

    @MockBean
    protected AccountRepository accountRepository;
}
