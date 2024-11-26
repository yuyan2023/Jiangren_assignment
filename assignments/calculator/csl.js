document.addEventListener('DOMContentLoaded', function() {
    const incomeInput = document.getElementById('income');
    const calculateButton = document.getElementById('calculate');
    const taxAmountElement = document.getElementById('tax-amount');
    const afterTaxElement = document.getElementById('after-tax');
    const taxRateElement = document.getElementById('tax-rate');

    function calculateTax(income) {
        if (income <= 18200) {
            return 0;
        } else if (income <= 45000) {
            return (income - 18200) * 0.19;
        } else if (income <= 120000) {
            return 5092 + (income - 45000) * 0.325;
        } else if (income <= 180000) {
            return 29467 + (income - 120000) * 0.37;
        } else {
            return 51667 + (income - 180000) * 0.45;
        }
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