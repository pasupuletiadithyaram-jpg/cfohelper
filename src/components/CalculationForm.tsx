import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator, DollarSign } from "lucide-react";
import type { SelectedOptions, CalculationData } from "./Dashboard";

interface CalculationFormProps {
  selectedOptions: SelectedOptions;
  onCalculate: (data: CalculationData) => void;
  onBack: () => void;
}

const inputLabels: Record<string, { label: string; placeholder: string; prefix?: string }> = {
  budget: { label: "Total Budget", placeholder: "Enter your total budget", prefix: "$" },
  expenditure: { label: "Current Expenditure", placeholder: "Enter current expenses", prefix: "$" },
  employees: { label: "Number of Employees", placeholder: "Enter employee count" },
  revenue_target: { label: "Revenue Target", placeholder: "Enter target revenue", prefix: "$" },
  operational_costs: { label: "Monthly Operational Costs", placeholder: "Enter monthly costs", prefix: "$" },
  project_duration: { label: "Project Duration (Months)", placeholder: "Enter duration in months" }
};

const CalculationForm = ({ selectedOptions, onCalculate, onBack }: CalculationFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [customFields, setCustomFields] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const calculationData: CalculationData = {};
    
    // Convert form data to numbers
    Object.entries(formData).forEach(([key, value]) => {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        switch (key) {
          case 'budget':
            calculationData.budget = numValue;
            break;
          case 'expenditure':
          case 'operational_costs':
            calculationData.expenditure = (calculationData.expenditure || 0) + numValue;
            break;
          case 'employees':
            calculationData.employees = numValue;
            break;
          default:
            if (!calculationData.customFields) calculationData.customFields = {};
            calculationData.customFields[key] = numValue;
        }
      }
    });
    
    onCalculate(calculationData);
  };

  const isFormValid = selectedOptions.inputs.every(input => {
    const value = formData[input];
    return value && !isNaN(parseFloat(value));
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Selection
        </Button>
        <div>
          <h2 className="text-3xl font-bold">Input Your Data</h2>
          <p className="text-muted-foreground">Enter the values for your selected inputs</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <CardTitle>Financial Data Input</CardTitle>
            </div>
            <CardDescription>
              Provide accurate values for the best analysis results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {selectedOptions.inputs.map((inputId) => {
                const config = inputLabels[inputId];
                if (!config) return null;

                return (
                  <div key={inputId} className="space-y-2">
                    <Label htmlFor={inputId} className="text-sm font-medium">
                      {config.label}
                    </Label>
                    <div className="relative">
                      {config.prefix && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {config.prefix}
                        </div>
                      )}
                      <Input
                        id={inputId}
                        type="number"
                        placeholder={config.placeholder}
                        value={formData[inputId] || ''}
                        onChange={(e) => handleInputChange(inputId, e.target.value)}
                        className={config.prefix ? 'pl-8' : ''}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold">Selected Outputs</h3>
                  <p className="text-sm text-muted-foreground">You'll receive analysis for these categories</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {selectedOptions.outputs.map((output) => (
                  <div 
                    key={output}
                    className="flex items-center gap-2 p-3 rounded-lg bg-success/10 border border-success/20"
                  >
                    <DollarSign className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium capitalize">
                      {output.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button 
            type="submit"
            disabled={!isFormValid}
            className="px-8 py-3 text-lg bg-gradient-to-r from-success to-primary hover:from-success/90 hover:to-primary/90"
          >
            Calculate Results
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CalculationForm;