import CrudService from "../../bases/crudService";
import AccountModel, { Account } from "./account.model";

class AccountService extends CrudService<Account> {
  constructor() {
    super(AccountModel);
  }
}

const accountService = new AccountService();

export default accountService;
