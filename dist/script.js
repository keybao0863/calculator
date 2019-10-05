class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      formula: '',
      num1: null,
      lastSign: '',
      afterEqual: false,
      canDecimal: true };

    this.numberInput = this.numberInput.bind(this);
    this.allClear = this.allClear.bind(this);
    this.operatorInput = this.operatorInput.bind(this);
    this.equalInput = this.equalInput.bind(this);

  }
  //make sure formula and display screen does not exceed digit limit
  componentDidUpdate() {
    if (this.state.formula.length > 39) {

      this.setState(state => {
        return { formula: state.formula.slice(1) };
      });
    }

    if (this.state.display.length > 25) {

      this.setState({
        display: "Digit Limit Reached" });



    }

  }

  //handle number input
  numberInput(e) {

    let curDisplay = this.state.display.toString();
    let updateFormula = this.state.formula + e.target.value;
    let update = curDisplay + e.target.value.toString();
    //if not decimal, remove leading zeros
    if (e.target.value != ".") {
      update = update.replace(/^0+/, '');
      if (update.length == 0) {
        update = '0';
      }
    }

    updateFormula = updateFormula.replace(/^0+/, '');
    if (updateFormula.length == 0) {updateFormula = '0';};


    //do not accept two decimals
    if (this.state.canDecimal == false && e.target.value == ".") {
      return;
    }


    //formula update

    this.setState({
      formula: updateFormula,
      display: update });


    if (e.target.value == ".") {
      this.setState({
        canDecimal: false });
    }

  }

  //allclear
  allClear() {
    this.setState({
      display: '0',
      num1: null,
      formula: '',
      canDecimal: true });

  }

  //operatorInput
  operatorInput(e) {
    //
    console.log("operator num1 before", this.state.num1);
    let sign = e.target.value;
    //if previous entry is an operator, do not compute
    if (this.state.formula.length > 0) {
      let lastform = this.state.formula[this.state.formula.length - 1];
      let myRex = /[\+\-\*\/]/;
      if (myRex.test(lastform)) {
        let updateFormula = this.state.formula.substring(0, this.state.formula.length - 1);

        this.setState({
          formula: updateFormula + sign,
          lastSign: sign });


        return;
      }
    }


    //formula add operator, display clear, save curdisplay in num1
    let curNum = parseFloat(this.state.display);
    //if there is previous number, calculate and store in num1
    let num1Update;
    if (this.state.num1 != null && this.state.afterEqual == false) {

      let num1 = this.state.num1;
      //handle plus
      switch (this.state.lastSign) {
        case "+":
          num1Update = num1 + curNum;
          break;
        case "-":
          num1Update = num1 - curNum;;
          break;
        case "*":
          num1Update = num1 * curNum;
          break;
        case "/":
          num1Update = num1 * 1.0 / curNum;
          break;
        default:
          num1Update = num1;}

    } else
    {
      num1Update = curNum;
    }

    console.log("num1update", num1Update, sign);

    this.setState((state, props) => {
      return {
        formula: state.formula + sign,
        display: '',
        num1: num1Update,
        lastSign: sign,
        afterEqual: false,
        canDecimal: true };
    }, () => console.log("operator after", this.state.num1));


  }

  //handle Equal
  equalInput() {

    //testing
    console.log("num1 in equal before", this.state.num1);
    //
    let num1Update;
    let curNum;
    if (this.state.display != '') {
      curNum = parseFloat(this.state.display);
    } else
    {
      curNum = '';
    }



    if (this.state.num1 == null && this.state.display == '') {
      console.log("triggernan", this.state.display);
      this.setState({
        display: "" });

    } else

    if (this.state.num1 != null && this.state.display == '') {
      this.setState({
        display: this.state.num1.toString() });

    } else



    {
      let num1 = this.state.num1;

      switch (this.state.lastSign) {
        case "+":
          num1Update = num1 + curNum;
          break;
        case "-":
          num1Update = num1 - curNum;;
          break;
        case "*":
          num1Update = num1 * curNum;
          break;
        case "/":
          num1Update = num1 / curNum;
          break;
        default:
          console.log("ERROR");}

      this.setState({
        display: num1Update.toString(),
        num1: num1Update,
        lastSign: '',
        afterEqual: true },
      () => console.log("num1 in equal after", this.state.num1));
    }

    //testing

    //


  }

  //render
  render() {


    return (
      React.createElement("div", { className: "calculator" },
      React.createElement("div", { className: "wholeScreen" },
      React.createElement("div", { className: "formulaScreen" },
      this.state.formula),


      React.createElement("div", { className: "display", id: "display" },
      this.state.display)),



      React.createElement("div", { className: "keyPad" },
      React.createElement("button", { type: "button", class: "operator", value: "+", onClick: this.operatorInput, id: "add" }, "+"),
      React.createElement("button", { type: "button", class: "operator", value: "-", onClick: this.operatorInput, id: "subtract" }, "-"),
      React.createElement("button", { type: "button", class: "operator", value: "*", onClick: this.operatorInput, id: "multiply" }, "\xD7"),
      React.createElement("button", { type: "button", class: "operator", value: "/", onClick: this.operatorInput, id: "divide" }, "\xF7"),

      React.createElement("button", { type: "button", value: "7", onClick: this.numberInput, id: "seven" }, "7"),
      React.createElement("button", { type: "button", value: "8", onClick: this.numberInput, id: "eight" }, "8"),
      React.createElement("button", { type: "button", value: "9", onClick: this.numberInput, id: "nine" }, "9"),


      React.createElement("button", { type: "button", value: "4", onClick: this.numberInput, id: "four" }, "4"),
      React.createElement("button", { type: "button", value: "5", onClick: this.numberInput, id: "five" }, "5"),
      React.createElement("button", { type: "button", value: "6", onClick: this.numberInput, id: "six" }, "6"),


      React.createElement("button", { type: "button", value: "1", onClick: this.numberInput, id: "one" }, "1"),
      React.createElement("button", { type: "button", value: "2", onClick: this.numberInput, id: "two" }, "2"),
      React.createElement("button", { type: "button", value: "3", onClick: this.numberInput, id: "three" }, "3"),


      React.createElement("button", { type: "button", value: "0", onClick: this.numberInput, id: "zero" }, "0"),
      React.createElement("button", { type: "button", class: "decimal", value: ".", onClick: this.numberInput, id: "decimal" }, "."),
      React.createElement("button", { type: "button", class: "all-clear", value: "all-clear", onClick: this.allClear, id: "clear" }, "AC"),

      React.createElement("button", { type: "button", id: "equals", class: "equal-sign", value: "=", onClick: this.equalInput }, "="))));




  }}


ReactDOM.render(React.createElement(Calculator, null), document.getElementById("root"));