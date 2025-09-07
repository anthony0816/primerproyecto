import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import LoadingSpinner from "./LoadindSniper";

const ModalVeryfyEmailCode = forwardRef((props, ref) => {
  const callBackFunction = useRef();
  const CancelOperationRef = useRef();
  const [email, setEmail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [SendingError, setSendingError] = useState(false);
  const [VerifyError, setVerifyError] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    open: (email, ProccedToCreateUser, CancelOperation) => {
      setIsOpen(true);
      setEmail(email);
      callBackFunction.current = ProccedToCreateUser;
      CancelOperationRef.current = CancelOperation;
    },
  }));

  useEffect(() => {
    if (!email) return;
    SendCode(email);
  }, [email]);

  const SendCode = (email) => {
    setSendingError(false);
    async function execute() {
      const res = await fetch("/api/email/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await res.json();

      console.log("Respueste de VERIFICAR CODIGO:", data);

      const { failed } = data;
      if (failed) {
        setSendingError(true);
        console.log("FAILED");
        return;
      }
    }
    execute();
  };

  const VerifyCode = async () => {
    if (!code) return;
    setIsLoading(true);

    const res = await fetch("/api/email/verify-code", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    });
    const data = await res.json();
    const { success } = data;

    if (success) {
      setIsLoading(false);
      close();
      callBackFunction.current();
      return;
    }

    if (!res.ok) {
      setVerifyError(true);
      setIsLoading(false);
      return;
    }
  };

  function Close() {
    setEmail(null);
    setIsOpen(false);
    CancelOperationRef.current();
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-5 rounded-t-xl">
            <h2 className="text-xl font-bold text-white text-center">
              Verificación de Email
            </h2>
          </div>

          {/* Contenido */}
          <div className="p-6">
            {/* Icono y mensaje */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <p className="text-gray-700 mb-2">
                Hemos enviado un código de verificación a tu email
              </p>
              <p className="text-sm text-gray-500">
                Revisa tu bandeja de entrada y spam
              </p>
            </div>

            {/* Input para el código */}
            <div className="mb-6">
              <label
                htmlFor="verification-code"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Código de verificación
              </label>
              <input
                type="text"
                id="verification-code"
                placeholder="Ingresa el código de 6 dígitos"
                maxLength={6}
                onChange={(event) => {
                  setVerifyError(false);
                  setCode(event.target.value);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl tracking-widest font-semibold"
              />
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-3">
              {isLoading ? (
                <LoadingSpinner text={"Verificando Código"} />
              ) : (
                <div>
                  <button
                    onClick={() => VerifyCode()}
                    className={`w-full ${
                      VerifyError ? "bg-red-200" : "bg-blue-500"
                    } text-white py-3 px-4 rounded-lg font-medium ${
                      VerifyError ? "hover:bg-red-300" : " hover:bg-blue-600"
                    } transition-colors shadow-md`}
                  >
                    {VerifyError ? "Error, Reintentar" : "Verificar Código"}
                  </button>
                  {VerifyError && (
                    <p className="text-red-400 font-bold px-5">
                      Puede que el codigo proporcionado sea incorrecto o hay
                      problemas contactar con el servidor
                    </p>
                  )}
                </div>
              )}

              <div>
                <button
                  onClick={() => SendCode(email)}
                  className={`w-full ${
                    !SendingError ? "bg-gray-100" : "bg-red-100"
                  } text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors`}
                >
                  {!SendingError ? "Reenviar Codigo" : "Error, Reintentar"}
                </button>
                {SendingError && (
                  <p className="text-red-400 font-bold px-5">
                    Ocurrio un error enviando el codigo, Reintente la Operacion
                  </p>
                )}
              </div>

              <button
                onClick={Close}
                className="bg-red-200 w-full text-red-500 py-2 px-4 rounded-lg font-medium hover:text-red-600 transition-colors"
              >
                Cancelar
              </button>
            </div>

            {/* Nota adicional */}
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800 text-center">
                ⏳ El código expira en 10 minutos
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

ModalVeryfyEmailCode.displayName = "ModalVeryfyEmailCode";
export default ModalVeryfyEmailCode;
