import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Calculator, TrendingUp, DollarSign, Users, BarChart3 } from "lucide-react";
import InputSelection from "./InputSelection";
import OutputSelection from "./OutputSelection";
import CalculationForm from "./CalculationForm";
import ResultsDisplay from "./ResultsDisplay";

interface DashboardProps {
  onLogout: () => void;
}

export interface SelectedOptions {
  inputs: string[];
  outputs: string[];
}

export interface CalculationData {
  budget?: number;
  expenditure?: number;
  employees?: number;
  customFields?: Record<string, number>;
}

export interface CalculationResults {
  profit?: number;
  loss?: number;
  revenue?: number;
  expenses?: number;
  runtime?: number;
  customOutputs?: Record<string, number>;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [currentStep, setCurrentStep] = useState<'selection' | 'input' | 'results'>('selection');
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    inputs: [],
    outputs: []
  });
  const [calculationData, setCalculationData] = useState<CalculationData>({});
  const [results, setResults] = useState<CalculationResults>({});

  const handleSelectionComplete = (options: SelectedOptions) => {
    setSelectedOptions(options);
    setCurrentStep('input');
  };

  const handleCalculationComplete = (data: CalculationData) => {
    setCalculationData(data);
    // Simulate calculations
    const mockResults: CalculationResults = {
      profit: (data.budget || 0) - (data.expenditure || 0),
      revenue: (data.budget || 0) * 1.2,
      expenses: data.expenditure || 0,
      runtime: Math.ceil((data.budget || 0) / (data.expenditure || 50) * 30),
    };
    setResults(mockResults);
    setCurrentStep('results');
  };

  const resetDashboard = () => {
    setCurrentStep('selection');
    setSelectedOptions({ inputs: [], outputs: [] });
    setCalculationData({});
    setResults({});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-success">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Budget Wise</h1>
                <p className="text-sm text-muted-foreground">Financial Management Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-3 py-1">
                Demo Mode
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { key: 'selection', label: 'Select Options', icon: BarChart3 },
              { key: 'input', label: 'Input Data', icon: DollarSign },
              { key: 'results', label: 'View Results', icon: TrendingUp }
            ].map(({ key, label, icon: Icon }, index) => (
              <div key={key} className="flex items-center">
                <div className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  ${currentStep === key ? 'bg-primary text-primary-foreground' : 
                    index < ['selection', 'input', 'results'].indexOf(currentStep) ? 
                    'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
                {index < 2 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    index < ['selection', 'input', 'results'].indexOf(currentStep) ? 
                    'bg-success' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 'selection' && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Configure Your Analysis</h2>
              <p className="text-muted-foreground">Select the input and output options for your financial analysis</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <InputSelection 
                selectedInputs={selectedOptions.inputs}
                onSelectionChange={(inputs) => setSelectedOptions({...selectedOptions, inputs})}
              />
              <OutputSelection 
                selectedOutputs={selectedOptions.outputs}
                onSelectionChange={(outputs) => setSelectedOptions({...selectedOptions, outputs})}
              />
            </div>
            
            <div className="text-center">
              <Button 
                onClick={() => handleSelectionComplete(selectedOptions)}
                disabled={selectedOptions.inputs.length === 0 || selectedOptions.outputs.length === 0}
                className="px-8 py-3 text-lg bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90"
              >
                Continue to Input Data
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'input' && (
          <CalculationForm 
            selectedOptions={selectedOptions}
            onCalculate={handleCalculationComplete}
            onBack={() => setCurrentStep('selection')}
          />
        )}

        {currentStep === 'results' && (
          <ResultsDisplay 
            selectedOptions={selectedOptions}
            calculationData={calculationData}
            results={results}
            onReset={resetDashboard}
            onBack={() => setCurrentStep('input')}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;