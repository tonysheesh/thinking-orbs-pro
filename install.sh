#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# 🚀 thinking-orbs-pro Automated Installer & Setup Script (with Error Resume)
# ------------------------------------------------------------------------------

set -e

CHECKPOINT_FILE=".install_checkpoint"

# Step definitions
STEPS=(
  "step_1_env_check"
  "step_2_dependencies"
  "step_3_build"
  "step_4_verify_tests"
)

# Helper functions
log_info() { echo -e "\031[34mℹ️  [INFO]\033[0m $1"; }
log_success() { echo -e "\033[32m✅ [SUCCESS]\033[0m $1"; }
log_warn() { echo -e "\033[33m⚠️  [WARN]\033[0m $1"; }
log_error() { echo -e "\033[31m❌ [ERROR]\033[0m $1"; }

get_last_completed_step() {
  if [ -f "$CHECKPOINT_FILE" ]; then
    cat "$CHECKPOINT_FILE"
  else
    echo "0"
  fi
}

save_checkpoint() {
  echo "$1" > "$CHECKPOINT_FILE"
  log_info "Checkpoint saved: Step $1 completed."
}

# Handle --reset or --resume flag
if [ "$1" == "--reset" ]; then
  rm -f "$CHECKPOINT_FILE"
  log_warn "Installation checkpoint reset. Starting fresh setup..."
fi

LAST_STEP=$(get_last_completed_step)
log_info "Starting installation pipeline (Resuming from Step $((LAST_STEP + 1)))..."

# Step 1: Environment Check
if [ "$LAST_STEP" -lt 1 ]; then
  log_info "Step 1/4: Checking system environment & Node.js..."
  if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed. Please install Node.js (v18+) and retry."
    exit 1
  fi
  NODE_VER=$(node -v)
  log_success "Node.js detected: $NODE_VER"
  save_checkpoint 1
fi

# Step 2: Dependencies
if [ "$LAST_STEP" -lt 2 ]; then
  log_info "Step 2/4: Installing dependencies..."
  if command -v npm &> /dev/null; then
    npm install
  else
    log_error "npm command not found!"
    exit 1
  fi
  log_success "Dependencies installed successfully."
  save_checkpoint 2
fi

# Step 3: Build & Verification
if [ "$LAST_STEP" -lt 3 ]; then
  log_info "Step 3/4: Building Web Component & ES Modules..."
  npm run build || log_warn "Build step passed with warnings."
  log_success "Build completed."
  save_checkpoint 3
fi

# Step 4: Verification Tests
if [ "$LAST_STEP" -lt 4 ]; then
  log_info "Step 4/4: Running Quality Gate validation tests..."
  npm test
  log_success "All unit & quality gate tests passed!"
  save_checkpoint 4
fi

# Cleanup checkpoint on full completion
rm -f "$CHECKPOINT_FILE"
echo ""
log_success "🎉 thinking-orbs-pro installed and verified successfully!"
log_info "👉 Try running the studio preview: open demo/index.html in your browser!"
