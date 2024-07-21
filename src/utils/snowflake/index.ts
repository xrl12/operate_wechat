class Snowflake {
    private twepoch: bigint;
    private workerIdBits: bigint;
    private datacenterIdBits: bigint;
    private maxWorkerId: bigint;
    private maxDatacenterId: bigint;
    private sequenceBits: bigint;
    private workerIdShift: bigint;
    private datacenterIdShift: bigint;
    private timestampLeftShift: bigint;
    private sequenceMask: bigint;
    private lastTimestamp: bigint;

    constructor(
        private workerId: bigint = 1n,
        private datacenterId: bigint = 1n,
        private sequence: bigint = 0n
    ) {
        this.twepoch = 1288834974657n;
        this.workerIdBits = 5n;
        this.datacenterIdBits = 5n;
        this.maxWorkerId = -1n ^ (-1n << this.workerIdBits);
        this.maxDatacenterId = -1n ^ (-1n << this.datacenterIdBits);
        this.sequenceBits = 12n;
        this.workerIdShift = this.sequenceBits;
        this.datacenterIdShift = this.sequenceBits + this.workerIdBits;
        this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.datacenterIdBits;
        this.sequenceMask = -1n ^ (-1n << this.sequenceBits);

        this.lastTimestamp = -1n;

        if (this.workerId > this.maxWorkerId || this.workerId < 0n) {
            throw new Error(`workerId must be between 0 and ${this.maxWorkerId}`);
        }

        if (this.datacenterId > this.maxDatacenterId || this.datacenterId < 0n) {
            throw new Error(`datacenterId must be between 0 and ${this.maxDatacenterId}`);
        }
    }

    private tilNextMillis(lastTimestamp: bigint): bigint {
        let timestamp = this.timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = this.timeGen();
        }
        return timestamp;
    }

    private timeGen(): bigint {
        return BigInt(Date.now());
    }

    public nextId(): bigint {
        let timestamp = this.timeGen();

        if (timestamp < this.lastTimestamp) {
            throw new Error(`Clock moved backwards. Refusing to generate id for ${this.lastTimestamp - timestamp} milliseconds`);
        }

        if (this.lastTimestamp === timestamp) {
            this.sequence = (this.sequence + 1n) & this.sequenceMask;
            if (this.sequence === 0n) {
                timestamp = this.tilNextMillis(this.lastTimestamp);
            }
        } else {
            this.sequence = 0n;
        }

        this.lastTimestamp = timestamp;

        return ((timestamp - this.twepoch) << this.timestampLeftShift) |
            (this.datacenterId << this.datacenterIdShift) |
            (this.workerId << this.workerIdShift) |
            this.sequence;
    }
}

// 使用示例
export default new Snowflake(1n, 1n, 0n);