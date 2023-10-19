import { ReactiveWC } from "../../../../src";
import { userService } from "../services/userService";

export class ListComponent extends ReactiveWC {
  constructor() {
    super();

    // Technically not necessary, but it'll save us a few "undefined" problems
    // in the beginning of the application, since this.state.users will be undefined until
    // onInit method is called
    this.state = this.defineState({
      users: [],
    });
  }

  onInit() {
    // No capabilities yet to execute a method call when it has one subscriber,
    // so it needs to be called somewhere. Here for instance is a good place.

    if (userService.users.value.length <= 0) userService.getUsers();
    userService.users.connect(this, (val) => {
      // We can perform any mutation of the value here, in plain JavaScript
      const filteredVal = val.filter((user) => user.id != 4);
      this.state.users = filteredVal;
    });

    // This is increasing the count calling a method within userService. The value is
    // then reflected inside the counter of the cards
    setInterval(() => {
      userService.inc();
    }, 1000);
  }

  onDestroy() {
    userService.users.disconnect(this);
    userService.count.disconnect(this);
  }

  render() {
    const elements = {
      SPINNER: /*html*/ `<div class="spinner"></div>`,
      ERROR_MESSAGE: /*html*/ `<error-message></error-message>`,
    };

    if (this.state.users.length == 0) {
      return elements["SPINNER"];
    }

    if (this.state.users == "KO") {
      return elements["ERROR_MESSAGE"];
    }

    // This is awfully awkward, I need to change the way we loop,
    // as well as the way we pass objects as props. In this case,
    // it is mandatory to pass the prop between single quotation marks.
    return this.state.users
      .map(
        (user) => /*html*/ ` 
        
            <card-component data_user='${JSON.stringify(
              user
            )}'></card-component>
            
            `
      )
      .join(" ");
  }
}
