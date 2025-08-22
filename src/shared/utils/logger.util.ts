class Logger {
  private time(): string {
    return new Date().toISOString();
  }

  private parse(
    logType: "INFO" | "ERROR",
    message: string,
    ...params: unknown[]
  ): string {
    return `[${logType}] ${this.time()} : ${message}${
      params.length > 0
        ? ` - ${params.map((p) => JSON.stringify(p)).join(" ")}`
        : ""
    }`;
  }

  info(message: string, ...params: unknown[]) {
    console.info(this.parse("INFO", message, ...params));
  }

  error(message: string, ...params: unknown[]) {
    console.error(this.parse("ERROR", message, ...params));
  }
}

const logger = new Logger();

export default logger;
