import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#E3F2FD", // أزرق سماوي فاتح للخلفية العامة
      paper: "#ffffff", // أبيض نظيف للكروت
    },
    primary: {
      main: "#0288D1", // أزرق معتدل للزرار أو العنصر الأساسي
    },
    success: {
      main: "#ffffff", // أخضر معتدل لجو مشمس أو جيد
    },
    warning: {
      main: "#FFA000", // برتقالي مشرق للغائم أو الغبار
    },
    error: {
      main: "#D32F2F", // أحمر لحالة عاصفة أو تحذير
    },
    text: {
      primary: "#0D47A1", // أزرق غامق للنصوص الأساسية
      secondary: "#37474F", // رمادي مزرق للنصوص الثانوية
    },
  },
  typography: {
    fontFamily: '"Cairo", "Roboto", "Arial", sans-serif',
  },
});

export default theme;
