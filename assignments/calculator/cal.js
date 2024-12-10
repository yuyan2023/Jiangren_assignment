document.addEventListener('DOMContentLoaded', function() {
    const incomeInput = document.getElementById('income');
    const calculateButton = document.getElementById('calculate');
    const taxAmountElement = document.getElementById('tax-amount');
    const afterTaxElement = document.getElementById('after-tax');
    const taxRateElement = document.getElementById('tax-rate');

    const taxCalculation = (income) => {

        let tax = 0;
      
        const taxTable =
      
          [
      
            { min: 0, max: 18200, calculation(income) { return 0; } },
      
            { min: 18201, max: 45000, calculation(income) { return parseFloat((income - 18200) * 0.19); } },
      
            { min: 45001, max: 120000, calculation(income) { return parseFloat((income - 45000) * 0.325 + 5092); } },
      
            { min: 120001, max: 180000, calculation(income) { return parseFloat((income - 120000) * 0.37 + 29567); } },
      
            { min: 180001, max: Infinity, calculation(income) { return parseFloat((income - 180000) * 0.45 + 51667); } },
      
          ];
      
        taxTable.forEach(element => {
      
          if (income >= element.min && income <= element.max) {
      
            tax = element.calculation(income);
      
          }
      
        });
      
       
      
        return tax;
      
      }
      
    
      
    
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    function formatPercentage(value) {
        return new Intl.NumberFormat('en-AU', {
            style: 'percent',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).format(value);
    }

    function updateResults() {
        const income = parseFloat(incomeInput.value) || 0;
        const tax = calculateTax(income);
        const afterTax = income - tax;
        const taxRate = income > 0 ? tax / income : 0;

        taxAmountElement.textContent = formatCurrency(tax);
        afterTaxElement.textContent = formatCurrency(afterTax);
        taxRateElement.textContent = formatPercentage(taxRate);
    }

    // 添加输入验证
    incomeInput.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });

    // 计算按钮点击事件
    calculateButton.addEventListener('click', updateResults);

    // 回车键触发计算
    incomeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            updateResults();
        }
    });

    // 初始化显示
    updateResults();
});