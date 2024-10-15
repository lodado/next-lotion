type AddUtilities = (utilities: Record<string, Record<string, string>>, variants?: string[]) => void;
type ThemeFunction = <T = unknown>(path: string, defaultValue?: T) => T;
type VariantsFunction = (path: string) => string[];

export const tailwindLogicalPropertiesPlugins = [
  ({
    addUtilities,
    matchUtilities,
    theme,
    variants,
  }: {
    addUtilities: AddUtilities;
    theme: ThemeFunction;
    matchUtilities: any;
    variants: VariantsFunction;
  }) => {
    const widthValues = theme("width") as Record<string, string>;
    const widthUtilities = Object.entries(widthValues).reduce((acc, [key, value]) => {
      acc[`.w-${key.replace("/", "\\/")}`] = {
        width: value,
        "inline-size": value,
      };
      return acc;
    }, {} as Record<string, any>);

    // height 값 가져오기
    const heightValues = theme("height") as Record<string, string>;
    const heightUtilities = Object.entries(heightValues).reduce((acc, [key, value]) => {
      acc[`.h-${key.replace("/", "\\/")}`] = {
        height: value,
        "block-size": value,
      };
      return acc;
    }, {} as Record<string, any>);

    // 동적 값 처리
    matchUtilities(
      {
        w: (value: string) => ({
          width: value,
          "inline-size": value,
        }),
        h: (value: string) => ({
          height: value,
          "block-size": value,
        }),
      },
      {
        values: {}, // 임의 값 지원을 위해 비워둠
        supportsNegativeValues: false, // 음수 값 지원 여부
      }
    );

    // 유틸리티 추가
    addUtilities(widthUtilities, variants("width"));
    addUtilities(heightUtilities, variants("height"));
  },

  ({
    addUtilities,
    matchUtilities,
    theme,
    variants,
  }: {
    addUtilities: AddUtilities;
    theme: ThemeFunction;
    matchUtilities: any;
    variants: VariantsFunction;
  }) => {
    // 동적 값 처리
    matchUtilities(
      {
        mt: (value: string) => ({
          "margin-top": value,
          "margin-block-start": value,
        }),
        mb: (value: string) => ({
          "margin-bottom": value,
          "margin-block-end": value,
        }),
        ml: (value: string) => ({
          "margin-left": value,
          "margin-inline-start": value,
        }),
        mr: (value: string) => ({
          "margin-right": value,
          "margin-inline-end": value,
        }),
        pt: (value: string) => ({
          "padding-top": value,
          "padding-block-start": value,
        }),
        pb: (value: string) => ({
          "padding-bottom": value,
          "padding-block-end": value,
        }),
        pl: (value: string) => ({
          "padding-left": value,
          "padding-inline-start": value,
        }),
        pr: (value: string) => ({
          "padding-right": value,
          "padding-inline-end": value,
        }),
        bt: (value: string) => ({
          "border-top": value,
          "border-block-start": value,
        }),
        bb: (value: string) => ({
          "border-bottom": value,
          "border-block-end": value,
        }),
        bl: (value: string) => ({
          "border-left": value,
          "border-inline-start": value,
        }),
        br: (value: string) => ({
          "border-right": value,
          "border-inline-end": value,
        }),
      },
      {
        values: theme("spacing"), // theme에서 spacing 값 사용
        supportsNegativeValues: true, // 음수 값 지원
      }
    );

    // 테마에 정의된 margin, padding, border 유틸리티 처리
    const spacingValues = theme("spacing") as Record<string, string>;
    const borderWidthValues = theme("borderWidth") as Record<string, string>;

    const marginUtilities = Object.entries(spacingValues).reduce((acc, [key, value]) => {
      acc[`.mt-${key}`] = {
        "margin-top": value,
        "margin-block-start": value,
      };
      acc[`.mb-${key}`] = {
        "margin-bottom": value,
        "margin-block-end": value,
      };
      acc[`.ml-${key}`] = {
        "margin-left": value,
        "margin-inline-start": value,
      };
      acc[`.mr-${key}`] = {
        "margin-right": value,
        "margin-inline-end": value,
      };
      return acc;
    }, {} as Record<string, Record<string, string>>);

    const paddingUtilities = Object.entries(spacingValues).reduce((acc, [key, value]) => {
      acc[`.pt-${key}`] = {
        "padding-top": value,
        "padding-block-start": value,
      };
      acc[`.pb-${key}`] = {
        "padding-bottom": value,
        "padding-block-end": value,
      };
      acc[`.pl-${key}`] = {
        "padding-left": value,
        "padding-inline-start": value,
      };
      acc[`.pr-${key}`] = {
        "padding-right": value,
        "padding-inline-end": value,
      };
      return acc;
    }, {} as Record<string, Record<string, string>>);

    const borderUtilities = Object.entries(borderWidthValues).reduce((acc, [key, value]) => {
      acc[`.bt-${key}`] = {
        "border-top-width": value,
        "border-block-start-width": value,
      };
      acc[`.bb-${key}`] = {
        "border-bottom-width": value,
        "border-block-end-width": value,
      };
      acc[`.bl-${key}`] = {
        "border-left-width": value,
        "border-inline-start-width": value,
      };
      acc[`.br-${key}`] = {
        "border-right-width": value,
        "border-inline-end-width": value,
      };
      return acc;
    }, {} as Record<string, Record<string, string>>);

    // 유틸리티 추가
    addUtilities(marginUtilities, variants("margin"));
    addUtilities(paddingUtilities, variants("padding"));
    addUtilities(borderUtilities, variants("borderWidth"));
  },

  ({
    addUtilities,
    matchUtilities,
    theme,
    variants,
  }: {
    addUtilities: AddUtilities;
    theme: ThemeFunction;
    matchUtilities: any;
    variants: VariantsFunction;
  }) => {
    matchUtilities(
      {
        top: (value: string) => ({
          top: value,
          "inset-block-start": value,
        }),
        bottom: (value: string) => ({
          bottom: value,
          "inset-block-end": value,
        }),
        left: (value: string) => ({
          left: value,
          "inset-inline-start": value,
        }),
        right: (value: string) => ({
          right: value,
          "inset-inline-end": value,
        }),
      },
      {
        values: theme("inset"), // theme에서 inset 값 사용
        supportsNegativeValues: true, // 음수 값 지원
      }
    );

    // 테마에 정의된 inset 유틸리티 처리
    const insetValues = theme("inset") as Record<string, string>;

    const insetUtilities = Object.entries(insetValues).reduce((acc, [key, value]) => {
      acc[`.top-${key.replace("/", "\\/")}`] = {
        top: value,
        "inset-block-start": value,
      };
      acc[`.bottom-${key.replace("/", "\\/")}`] = {
        bottom: value,
        "inset-block-end": value,
      };
      acc[`.left-${key.replace("/", "\\/")}`] = {
        left: value,
        "inset-inline-start": value,
      };
      acc[`.right-${key.replace("/", "\\/")}`] = {
        right: value,
        "inset-inline-end": value,
      };
      return acc;
    }, {} as Record<string, Record<string, string>>);

    // 유틸리티 추가
    addUtilities(insetUtilities, variants("inset"));
  },

  ({
    addUtilities,
    matchUtilities,
    theme,
    variants,
  }: {
    addUtilities: AddUtilities;
    theme: ThemeFunction;
    matchUtilities: any;
    variants: VariantsFunction;
  }) => {
    matchUtilities(
      {
        float: (value: string) => {
          if (value === "left") {
            return {
              float: "inline-start",
            };
          }
          if (value === "right") {
            return {
              float: "inline-end",
            };
          }
          return {
            float: value, // 다른 값들은 기본적으로 그대로 적용
          };
        },
        clear: (value: string) => {
          if (value === "left") {
            return {
              clear: "inline-start",
            };
          }
          if (value === "right") {
            return {
              clear: "inline-end",
            };
          }
          return {
            clear: value, // 다른 값들은 기본적으로 그대로 적용
          };
        },
      },
      {
        values: theme("float"), // float 테마 값 사용
        supportsNegativeValues: false, // 음수 값은 불필요
      }
    );

    // 테마에 정의된 float 및 clear 값 처리
    const floatValues = theme("float", { none: "none", left: "left", right: "right" }) as Record<string, string>;
    const clearValues = theme("clear", { none: "none", left: "left", right: "right", both: "both" }) as Record<
      string,
      string
    >;

    const floatUtilities = Object.entries(floatValues).reduce((acc, [key, value]) => {
      if (value === "left") {
        acc[`.float-${key}`] = {
          float: "inline-start",
        };
      } else if (value === "right") {
        acc[`.float-${key}`] = {
          float: "inline-end",
        };
      } else {
        acc[`.float-${key}`] = {
          float: value,
        };
      }
      return acc;
    }, {} as Record<string, Record<string, string>>);

    const clearUtilities = Object.entries(clearValues).reduce((acc, [key, value]) => {
      if (value === "left") {
        acc[`.clear-${key}`] = {
          clear: "inline-start",
        };
      } else if (value === "right") {
        acc[`.clear-${key}`] = {
          clear: "inline-end",
        };
      } else {
        acc[`.clear-${key}`] = {
          clear: value,
        };
      }
      return acc;
    }, {} as Record<string, Record<string, string>>);

    // 유틸리티 추가
    addUtilities(floatUtilities, variants("float"));
    addUtilities(clearUtilities, variants("clear"));
  },

  ({
    addUtilities,
    matchUtilities,
    theme,
    variants,
  }: {
    addUtilities: AddUtilities;
    theme: ThemeFunction;
    matchUtilities: any;
    variants: VariantsFunction;
  }) => {
    const textAlignValues = theme("textAlign", {
      left: "left",
      right: "right",
      center: "center",
      justify: "justify",
      start: "start",
      end: "end",
    }) as Record<string, string>;

    const textAlignUtilities = Object.entries(textAlignValues).reduce((acc, [key, value]) => {
      if (value === "left") {
        acc[`.text-${key}`] = {
          "text-align": "start",
        };
      } else if (value === "right") {
        acc[`.text-${key}`] = {
          "text-align": "end",
        };
      } else {
        acc[`.text-${key}`] = {
          "text-align": value,
        };
      }
      return acc;
    }, {} as Record<string, Record<string, string>>);

    // 유틸리티 추가
    addUtilities(textAlignUtilities, variants("textAlign"));
  },

  ({
    addUtilities,
    matchUtilities,
    theme,
    variants,
  }: {
    addUtilities: AddUtilities;
    theme: ThemeFunction;
    matchUtilities: any;
    variants: VariantsFunction;
  }) => {
    const resizeUtilities = {
      ".resize-inline": {
        resize: "inline",
      },
      ".resize-block": {
        resize: "block",
      },
    };

    // 기존 Tailwind의 resize 값에 대해 논리적 속성 유틸리티 추가
    addUtilities(resizeUtilities, variants("resize"));
  },

  /*

  ({
    addUtilities,
    matchUtilities,
    theme,
    variants,
  }: {
    addUtilities: AddUtilities;
    theme: ThemeFunction;
    matchUtilities: any;
    variants: VariantsFunction;
  }) => {},

  */
];
