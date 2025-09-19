import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Activity, Clock, BarChart3, PieChart, AlertTriangle } from "lucide-react";

interface OutputSelectionProps {
  selectedOutputs: string[];
  onSelectionChange: (outputs: string[]) => void;
}

const outputOptions = [
  {
    id: 'profit',
    name: 'Profit Analysis',
    description: 'Calculate net profit and profit margins',
    icon: TrendingUp,
    color: 'success'
  },
  {
    id: 'loss',
    name: 'Loss Assessment',
    description: 'Identify potential losses and risk factors',
    icon: TrendingDown,
    color: 'destructive'
  },
  {
    id: 'revenue',
    name: 'Revenue Projection',
    description: 'Forecast revenue and income streams',
    icon: DollarSign,
    color: 'success'
  },
  {
    id: 'expenses',
    name: 'Expense Breakdown',
    description: 'Detailed analysis of all expenses',
    icon: Activity,
    color: 'warning'
  },
  {
    id: 'runtime',
    name: 'Runtime Analysis',
    description: 'Project timeline and duration calculations',
    icon: Clock,
    color: 'info'
  },
  {
    id: 'roi',
    name: 'ROI Calculator',
    description: 'Return on investment calculations',
    icon: BarChart3,
    color: 'primary'
  },
  {
    id: 'cash_flow',
    name: 'Cash Flow Analysis',
    description: 'Monthly cash flow projections',
    icon: PieChart,
    color: 'accent'
  },
  {
    id: 'risk_assessment',
    name: 'Risk Assessment',
    description: 'Financial risk analysis and recommendations',
    icon: AlertTriangle,
    color: 'warning'
  }
];

const OutputSelection = ({ selectedOutputs, onSelectionChange }: OutputSelectionProps) => {
  const toggleOutput = (outputId: string) => {
    const newSelection = selectedOutputs.includes(outputId)
      ? selectedOutputs.filter(id => id !== outputId)
      : [...selectedOutputs, outputId];
    onSelectionChange(newSelection);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-success" />
          <CardTitle>Output Options</CardTitle>
        </div>
        <CardDescription>
          Choose what you want to calculate and analyze
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {outputOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedOutputs.includes(option.id);
            
            return (
              <Button
                key={option.id}
                variant={isSelected ? "default" : "outline"}
                className={`
                  h-auto p-4 justify-start text-left
                  ${isSelected ? 'bg-success hover:bg-success/90' : 'hover:bg-accent'}
                `}
                onClick={() => toggleOutput(option.id)}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className={`
                    p-2 rounded-lg 
                    ${isSelected ? 'bg-success-foreground/20' : 'bg-success/10'}
                  `}>
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-success-foreground' : 'text-success'}`} />
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
                    <p className={`text-sm mt-1 ${isSelected ? 'text-success-foreground/80' : 'text-muted-foreground'}`}>
                      {option.description}
                    </p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Selected:</span>
          <Badge variant="outline">
            {selectedOutputs.length} output{selectedOutputs.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutputSelection;