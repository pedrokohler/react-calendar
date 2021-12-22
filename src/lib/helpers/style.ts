export const purposeColorSelector = ({ purpose }: { purpose?: string }) => {
  switch(purpose){
    case "danger": {
      return "#dc3545";
    }
    case "secondary": {
      return "#6c757d";
    }
    case "primary": {
      return "#007bff";
    }
    default:
      return "default"
  }
}