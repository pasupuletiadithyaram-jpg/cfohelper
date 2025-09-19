import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, TrendingUp, TrendingDown, DollarSign, Clock, AlertCircle, CheckCircle, BarChart3 } from "lucide-react";
import type { SelectedOptions, CalculationData, CalculationResults } from "./Dashboard";

interface ResultsDisplayProps {
  selectedOptions: SelectedOptions;
  calculationData: CalculationData;
  results: CalculationResults;
  onReset: () => void;
  onBack: () => void;
}

const ResultsDisplay = ({ selectedOptions, calculationData, results, onReset, onBack }: ResultsDisplayProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getFinancialAdvice = () => {
    const profit = results.profit || 0;
    const budget = calculationData.budget || 0;
    const profitMargin = budget > 0 ? (profit / budget) * 100 : 0;

    if (profit > 0 && profitMargin > 20) {
      return {
        type: 'success',
        title: 'Excellent Financial Health',
        message: 'Your budget shows strong profitability with healthy margins. Consider reinvesting profits for growth or expanding your team.',
        icon: CheckCircle
      };
    } else if (profit > 0 && profitMargin > 10) {
      return {
        type: 'info',
        title: 'Positive but Room for Improvement',
        message: 'You\'re profitable but margins could be better. Look for cost optimization opportunities or revenue enhancement strategies.',
        icon: TrendingUp
      };
    } else if (profit <= 0) {
      return {
        type: 'warning',
        title: 'Action Required',
        message: 'Current projections show losses. Consider reducing expenses, increasing revenue, or adjusting your budget allocation.',
        icon: AlertCircle
      };
    } else {
      return {
        type: 'info',
        title: 'Break-even Analysis',
        message: 'You\'re close to break-even. Small adjustments in either direction could significantly impact your bottom line.',
        icon: BarChart3
      };
    }
  };

  const advice = getFinancialAdvice();
  const AdviceIcon = advice.icon;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Input
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold">Analysis Results</h2>
          <p className="text-muted-foreground">Your comprehensive financial analysis is ready</p>
        </div>
        <Button onClick={onReset} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          New Analysis
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {selectedOptions.outputs.includes('profit') && results.profit !== undefined && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className={`h-5 w-5 ${results.profit >= 0 ? 'text-success' : 'text-destructive'}`} />
                <span className="text-sm font-medium text-muted-foreground">Net Profit</span>
              </div>
              <p className={`text-2xl font-bold mt-2 ${results.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(results.profit)}
              </p>
            </CardContent>
          </Card>
        )}

        {selectedOptions.outputs.includes('revenue') && results.revenue !== undefined && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-success" />
                <span className="text-sm font-medium text-muted-foreground">Projected Revenue</span>
              </div>
              <p className="text-2xl font-bold mt-2 text-success">
                {formatCurrency(results.revenue)}
              </p>
            </CardContent>
          </Card>
        )}

        {selectedOptions.outputs.includes('expenses') && results.expenses !== undefined && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
              </div>
              <p className="text-2xl font-bold mt-2 text-warning">
                {formatCurrency(results.expenses)}
              </p>
            </CardContent>
          </Card>
        )}

        {selectedOptions.outputs.includes('runtime') && results.runtime !== undefined && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-info" />
                <span className="text-sm font-medium text-muted-foreground">Runtime</span>
              </div>
              <p className="text-2xl font-bold mt-2 text-info">
                {results.runtime} days
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detailed Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Financial Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Financial Breakdown
            </CardTitle>
            <CardDescription>
              Detailed analysis of your financial data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="font-medium">Initial Budget</span>
                <span className="font-bold">{formatCurrency(calculationData.budget || 0)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="font-medium">Total Expenses</span>
                <span className="font-bold text-warning">{formatCurrency(calculationData.expenditure || 0)}</span>
              </div>
              {calculationData.employees && (
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="font-medium">Team Size</span>
                  <span className="font-bold">{calculationData.employees} employees</span>
                </div>
              )}
              <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                <span className="font-medium">Net Result</span>
                <Badge variant={results.profit && results.profit >= 0 ? "default" : "destructive"}>
                  {formatCurrency(results.profit || 0)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI-Powered Advice */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AdviceIcon className="h-5 w-5" />
              Financial Advice
            </CardTitle>
            <CardDescription>
              AI-powered recommendations based on your analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg border ${
              advice.type === 'success' ? 'bg-success/10 border-success/20' :
              advice.type === 'warning' ? 'bg-warning/10 border-warning/20' :
              'bg-info/10 border-info/20'
            }`}>
              <h4 className="font-semibold mb-2">{advice.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {advice.message}
              </p>
            </div>
            
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-sm">Key Recommendations:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Monitor cash flow regularly to ensure sustainable operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Consider scenario planning for different budget allocations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Review and optimize expenses quarterly</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Visual Analysis
          </CardTitle>
          <CardDescription>
            Graphical representation of your financial data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-r from-primary/10 via-success/10 to-info/10 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="text-lg font-semibold">Interactive Charts Coming Soon</p>
              <p className="text-sm text-muted-foreground">Connect Supabase to enable advanced data visualization</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;