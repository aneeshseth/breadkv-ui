"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function TComponent({ slug }: any) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const createParam = searchParams.get("create");

  async function checkValidity() {
    try {
      const res = await axios.post(
        `https://${slug}.bowbox.click/redis`,
        "PING",
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      const data = await res.data;
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function startupComponents() {
    try {
      const res = await axios.post(`https://server.bowbox.click/start`, {
        instanceId: slug,
      });
      const data = await res.data;
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function sendCommand() {
    try {
      const res = await axios.post(
        `https://${slug}.bowbox.click/redis`,
        input,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      const data = await res.data;
      return data;
    } catch (err) {
      router.push(`/error_instance/${slug}`);
    }
  }

  useEffect(() => {
    const initializeInstance = async () => {
      if (createParam) {
        setIsLoading(true);
        setHistory([
          {
            command: "",
            output: "Creating new BreadKV instance, Please wait...",
          },
        ]);

        try {
          await startupComponents();
        } catch {
          try {
            await checkValidity();
          } catch {
            router.push(`/error_instance/${slug}`);
            return;
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 15000));

        try {
          await checkValidity();
          setHistory([
            {
              command: "",
              output:
                "Welcome! You will have 15 minutes since this instance's creation to use it, after which it will be destroyed. Type 'help' for available commands.",
            },
          ]);
        } catch {
          router.push(`/error_instance/${slug}`);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          await checkValidity();
        } catch {
          router.push(`/error_instance/${slug}`);
        }
      }
    };

    initializeInstance();
  }, [createParam, slug]);

  const [history, setHistory] = useState<{ command: string; output: string }[]>(
    [
      {
        command: "",
        output:
          "Welcome! Type 'help' for available commands. You will have 15 minutes since this instance's creation to use it, after which it will be destroyed.",
      },
    ]
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const executeCommand = async (command: string) => {
    if (command.trim() === "") {
      return;
    }

    setHistory((prev) => [...prev, { command, output: "" }]);

    let output = "";

    if (command === "help") {
      output = "Available commands: PING, SET, GET";
    } else if (command === "clear") {
      setHistory([]);
      return;
    } else if (command === "date") {
      output = new Date().toString();
    } else if (command.startsWith("echo ")) {
      output = command.substring(5);
    } else if (command === "whoami") {
      output = "user@terminal";
    } else {
      try {
        setInput(command);
        const response = await sendCommand();
        output = response || `Command executed: ${command}`;
      } catch (err) {
        output = `Error executing command: ${command}`;
      } finally {
        setInput("");
      }
    }

    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory[newHistory.length - 1].output = output;
      return newHistory;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = input;
      setInput("");
      executeCommand(command);
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex justify-center items-center w-full border-2 border-black border-solid h-screen bg-black p-6">
      <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="bg-gray-800 text-white p-2 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          </div>
          <div className="text-sm font-medium">
            This runs your instance{" "}
            <span className="text-green-500"> {slug} </span> in a remote managed
            cluster.
          </div>
        </div>

        <div
          ref={terminalRef}
          className="bg-black text-yellow-400 p-4 h-80 overflow-y-auto font-mono text-sm"
          onClick={handleTerminalClick}
        >
          {isLoading && (
            <div className="flex items-center justify-center h-full flex-col">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
              <div className="text-sm font-medium mt-4">
                (takes 15-40 seconds to spin up/fetch your instance)
              </div>
            </div>
          )}

          {!isLoading &&
            history.map((item, index) => (
              <div key={index}>
                {item.command && (
                  <div className="flex items-start">
                    <span className="text-yellow-500 mr-2">$</span>
                    <span>{item.command}</span>
                  </div>
                )}
                {item.output && (
                  <div className="whitespace-pre-wrap mb-2 pl-4">
                    {item.output}
                  </div>
                )}
              </div>
            ))}

          {!isLoading && (
            <div className="flex items-center mt-1">
              <span className="text-yellow-500 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-yellow-400 w-full"
                aria-label="Terminal input"
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
