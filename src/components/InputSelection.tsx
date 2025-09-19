import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingDown, Users, Plus, Calculator, Building, Clock, Target } from "lucide-react";

interface InputSelectionProps {
  selectedInputs: string[];
  onSelectionChange: (inputs: string[]) => void;
}

const inputOptions = [
  {
    id: 'budget',
    name: 'Budget',
    description: 'Total available budget for the project or period',
    icon: DollarSign,
    color: 'success'
  },
  {
    id: 'expenditure',
    name: 'Expenditure',
    description: 'Current or planned expenses and costs',
    icon: TrendingDown,
    color: 'destructive'
  },
  {
    id: 'employees',
    name: 'Number of Employees',
    description: 'Team size and hiring plans',
    icon: Users,
    color: 'info'
  },
  {
    id: 'revenue_target',
    name: 'Revenue Target',
    description: 'Expected income goals and targets',
    icon: Target,
    color: 'warning'
  },
  {
    id: 'operational_costs',
    name: 'Operational Costs',
    description: 'Monthly operational and overhead expenses',
    icon: Building,
    color: 'secondary'
  },
  {
    id: 'project_duration',
    name: 'Project Duration',
    description: 'Timeline and duration in months',
    icon: Clock,
    color: 'accent'
  }
];

const InputSelection = ({ selectedInputs, onSelectionChange }: InputSelectionProps) => {
  const toggleInput = (inputId: string) => {
    const newSelection = selectedInputs.includes(inputId)
      ? selectedInputs.filter(id => id !== inputId)
      : [...selectedInputs, inputId];
    onSelectionChange(newSelection);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <CardTitle>Input Options</CardTitle>
        </div>
        <CardDescription>
          Select the data you want to input for analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {inputOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedInputs.includes(option.id);
            
            return (
              <Button
                key={option.id}
                variant={isSelected ? "default" : "outline"}
                className={`
                  h-auto p-4 justify-start text-left
                  ${isSelected ? 'bg-primary hover:bg-primary/90' : 'hover:bg-accent'}
                `}
                onClick={() => toggleInput(option.id)}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className={`
                    p-2 rounded-lg 
                    ${isSelected ? 'bg-primary-foreground/20' : 'bg-primary/10'}
                  `}>
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-primary-foreground' : 'text-primary'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{option.name}</span>
                      {isSelected && (
                        <Badge variant="secondary" className="text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm mt-1 ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {option.description}
                    </p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full gap-2" size="sm">
            <Plus className="h-4 w-4" />
            Add Custom Field
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Create custom input fields for specific needs
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Selected:</span>
          <Badge variant="outline">
            {selectedInputs.length} input{selectedInputs.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default InputSelection;